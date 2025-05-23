export interface Station {
  code: string;
  name: string;
}

export interface JourneyDetails {
  departureTime: string;
  departureStation: Station;
  arrivalTime: string;
  arrivalStation: Station;
  trainNumber: string;
  duration: string;
  price: number;
  currency: string;
}

export interface Journey {
  campany: string;
  index: number;
  journey: JourneyDetails;
}