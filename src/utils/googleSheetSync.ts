import { RSVPData } from '../types';

export const DEFAULT_GOOGLE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTY8why3Y11Xk2nMYno1S4u0A0U3QqBOkM_oK3iBKquBLjoAL6YImLBoueVyy8cX2lSxqQ6T1jaNjKo/pub?output=csv';

/**
 * Transforms any Google Sheet URL into a CORS-accessible CSV export endpoint.
 * Supports:
 * - Published to web CSV URLs: https://docs.google.com/spreadsheets/d/e/2PACX-1vTY8why3Y11Xk2nMYno1S4u0A0U3QqBOkM_oK3iBKquBLjoAL6YImLBoueVyy8cX2lSxqQ6T1jaNjKo/pub?output=csv
 * - Standard edit URLs: https://docs.google.com/spreadsheets/d/<ID>/edit...
 * - Gviz query URLs: https://docs.google.com/spreadsheets/d/<ID>/gviz/tq?tqx=out:csv
 */
export function normalizeGoogleSheetUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Already a published CSV URL
  if (trimmed.includes('/pub') && trimmed.includes('output=csv')) {
    return trimmed;
  }

  // Extract Sheet ID from standard Google Sheet URL
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    const sheetId = match[1];
    // If it is a /d/e/ published ID, make sure pub?output=csv
    if (sheetId === 'e') {
      return trimmed.includes('output=csv') ? trimmed : `${trimmed}${trimmed.includes('?') ? '&' : '?'}output=csv`;
    }
    return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
  }

  return trimmed;
}

/**
 * Robust CSV parser that handles multiline cells, double quotes, and commas.
 */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip carriage return newline pair
      }
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Formats a Google Sheet timestamp string into a friendly, elegant display.
 */
export function formatFriendlyTime(rawTimestamp: string): string {
  if (!rawTimestamp) return 'Recently';

  try {
    const date = new Date(rawTimestamp);
    if (!isNaN(date.getTime())) {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMinutes < 5) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes} mins ago`;
      if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hr' : 'hrs'} ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;

      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  } catch {
    // Fallback to raw string
  }

  return rawTimestamp;
}

/**
 * Fetches real-time RSVP responses and blessings from a public/published Google Sheet CSV.
 */
export async function fetchWishesFromGoogleSheet(sheetUrl: string): Promise<RSVPData[]> {
  const normalizedUrl = normalizeGoogleSheetUrl(sheetUrl);
  if (!normalizedUrl) return [];

  // Add cache buster to ensure real-time fresh responses
  const cacheBuster = `_cb=${Date.now()}`;
  const urlWithCacheBuster = normalizedUrl.includes('?')
    ? `${normalizedUrl}&${cacheBuster}`
    : `${normalizedUrl}?${cacheBuster}`;

  const response = await fetch(urlWithCacheBuster, {
    method: 'GET',
    headers: {
      Accept: 'text/csv, text/plain, */*',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Google Sheet data (status ${response.status})`);
  }

  const csvText = await response.text();
  const rows = parseCSV(csvText);

  if (rows.length <= 1) {
    return [];
  }

  // Header row:
  // [Timestamp, Name, Attire Theme Check, Will You Be Attending, Number of Guests, Attire Theme Check, Blessings & Message for the Couple]
  const dataRows = rows.slice(1);

  const parsedWishes: RSVPData[] = [];

  dataRows.forEach((row, index) => {
    const rawTimestamp = row[0] || '';
    const name = row[1] || '';
    const attire1 = row[2] || '';
    const attendanceRaw = row[3] || '';
    const guestsRaw = row[4] || '';
    const attire2 = row[5] || '';
    const messageRaw = row[6] || row[5] || '';

    // Ignore completely empty rows
    if (!name.trim()) return;

    const cleanName = name.trim();
    const cleanMessage =
      messageRaw.trim() ||
      'May your union be blessed with lifelong happiness and love!';

    // Deduplicate consecutive accidental double submissions
    const prevWish = parsedWishes[parsedWishes.length - 1];
    if (
      prevWish &&
      prevWish.name.toLowerCase() === cleanName.toLowerCase() &&
      prevWish.message.toLowerCase() === cleanMessage.toLowerCase()
    ) {
      return;
    }

    const isAttending =
      attendanceRaw.toLowerCase().includes('joyful') ||
      attendanceRaw.toLowerCase().includes('yes') ||
      attendanceRaw.toLowerCase().includes('accept');

    // Parse guest count integer if possible
    const parsedGuests = parseInt(guestsRaw.replace(/\D/g, ''), 10) || (isAttending ? 1 : 0);

    parsedWishes.push({
      id: `gsheet-${index}-${cleanName.replace(/\s+/g, '').toLowerCase()}`,
      name: cleanName,
      attending: isAttending ? 'yes' : 'no',
      guestCount: parsedGuests,
      dietary: attire1.trim() || attire2.trim() || 'White & Beige Confirmed',
      message: cleanMessage,
      timestamp: formatFriendlyTime(rawTimestamp),
    });
  });

  // Reverse so newest entries from the bottom of the Google Sheet appear on top
  return parsedWishes.reverse();
}
