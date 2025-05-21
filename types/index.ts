export interface Station {
  code: string;
  name: string;
}

export interface JourneyDetails {
  id: string;
  campany: string;
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
  index: number;
  journey: JourneyDetails;
}