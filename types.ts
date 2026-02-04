
export interface UserProfile {
  id: string;
  name: string;
  carMake: string;
  carModel: string;
  avatar: string;
}

export interface SpeedEntry {
  userId: string;
  userName: string;
  carInfo: string;
  topSpeed: number;
  timestamp: number;
}

export interface CompetitionGroup {
  id: string;
  name: string;
  members: string[]; // User IDs
}

export type Unit = 'MPH' | 'KMH';
