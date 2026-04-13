export type CarSpec = {
  label: string;
  value: string;
};

export type CarImage = {
  id: string;
  label: string;
  url?: string;
};

export type Car = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  monthlyPrice: string;
  cashPrice: string;
  category: string;
  overview: string;
  images: CarImage[];
  colors: string[];
  specs: CarSpec[];
  features: string[];
  isActive?: boolean;
  badgeText?: string;
};