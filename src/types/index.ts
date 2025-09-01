export interface Bonsai {
  id: string;
  name: string;
  description: string;
  price: number;
  age: number;
  species: string;
  image: string;
  status: 'available' | 'sold' | 'reserved';
  location: string;
  master: string;
  maintenanceFee: number;
  owner?: string; // 現在の所有者（任意）
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  price: number;
  capacity: number;
  available: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface AuctionItem {
  id: string;
  bonsai: Bonsai;
  startPrice: number;
  currentPrice: number;
  minimumPrice: number;
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'live' | 'ended';
  priceDropInterval: number; // 価格下降間隔（秒）
  priceDropAmount: number; // 価格下降幅
  bidHistory: BidRecord[];
}

export interface BidRecord {
  id: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface LiveAuction {
  id: string;
  title: string;
  description: string;
  items: AuctionItem[];
  status: 'upcoming' | 'live' | 'ended';
  startTime: string;
  endTime: string;
}
