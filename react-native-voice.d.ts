// Create this file as: types/react-native-voice.d.ts or src/types/react-native-voice.d.ts

declare module 'react-native-voice' {
    export interface SpeechRecognizedEvent {
      isFinal?: boolean;
    }
  
    export interface SpeechResultsEvent {
      value?: string[];
    }
  
    export interface SpeechErrorEvent {
      error?: {
        code?: string;
        message?: string;
      };
    }
  
    export interface SpeechVolumeChangeEvent {
      value?: number;
    }
  
    export interface SpeechStartEvent {
      // Add properties if needed
    }
  
    export interface SpeechEndEvent {
      // Add properties if needed
    }
  
    class Voice {
      static onSpeechStart: ((event: SpeechStartEvent) => void) | null;
      static onSpeechRecognized: ((event: SpeechRecognizedEvent) => void) | null;
      static onSpeechEnd: ((event: SpeechEndEvent) => void) | null;
      static onSpeechError: ((event: SpeechErrorEvent) => void) | null;
      static onSpeechResults: ((event: SpeechResultsEvent) => void) | null;
      static onSpeechPartialResults: ((event: SpeechResultsEvent) => void) | null;
      static onSpeechVolumeChanged: ((event: SpeechVolumeChangeEvent) => void) | null;
  
      static start(locale?: string): Promise<void>;
      static stop(): Promise<void>;
      static cancel(): Promise<void>;
      static destroy(): Promise<void>;
      static removeAllListeners(): void;
      static requestPermissions(): Promise<boolean>;
      static isAvailable(): Promise<boolean>;
      static getSpeechRecognitionServices(): Promise<string[]>;
      static isRecognizing(): Promise<boolean>;
    }
  
    export default Voice;
  }