export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Banner {
  id: string;
  image: string;
  mobileImage?: string;
  link: string;
  active: boolean;
}

export interface MiniBanner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  color: string;
  active: boolean;
}

export interface Invoice {
  id: string;
  userId: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: string;
}
