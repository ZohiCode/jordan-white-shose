
export interface ShoeVariant {
  id: string;
  name: string;
  color: string;
  hex: string;
  price: string;
  description: string;
}

export interface AppState {
  currentVariant: ShoeVariant;
  selectedSize: string;
}
