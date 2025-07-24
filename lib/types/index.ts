// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: 'student' | 'researcher' | 'technician' | 'admin';
  city: string;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Sample Types
export interface Sample {
  id: string;
  sampleId: string;
  sampleType: 'water' | 'soil' | 'plant' | 'biological';
  collectionTime: Date;
  collectionDate: Date;
  geolocation: {
    latitude: number;
    longitude: number;
  };
  fieldConditions: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    other?: Record<string, any>;
  };
  userId: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Reservation Types
export interface Reservation {
  id: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  purpose: string;
  createdAt: Date;
  updatedAt: Date;
}

// Protocol Types
export interface Protocol {
  id: string;
  title: string;
  description: string;
  steps: ProtocolStep[];
  category: string;
  experimentType: string;
  biologicalSampleType: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProtocolStep {
  stepNumber: number;
  instruction: string;
  imageUrl?: string;
  estimatedTime?: string;
}

// Report Types
export interface Report {
  id: string;
  title: string;
  description: string;
  sampleIds: string[];
  charts: ChartData[];
  generatedBy: string;
  createdAt: Date;
  sharedWith: string[];
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie';
  title: string;
  data: any;
  config: any;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'sampleEntry' | 'statusUpdate' | 'reportGenerated' | 'reservationConfirmed';
  message: string;
  read: boolean;
  createdAt: Date;
}

// Device Types
export interface BluetoothDevice {
  id: string;
  name: string;
  type: 'temperature' | 'pH' | 'environmental' | 'other';
  isConnected: boolean;
  lastReading?: any;
  lastConnected?: Date;
}