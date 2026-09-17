export interface WeddingConfig {
  brideName: string;
  groomName: string;
  date: string; // ISO format or display string
  ceremonyTime: string;
  receptionTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  storyQuote: string;
  dressCodeGirls?: string;
  dressCodeBoys?: string;
}

export interface RSVPData {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  guestCount: number;
  dietary: string;
  message: string;
  timestamp: string;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'church' | 'wine' | 'utensils' | 'music' | 'heart' | 'sparkles';
  location: string;
}

export interface LoveMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}
