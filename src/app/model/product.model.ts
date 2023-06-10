export interface Product {
  id: string;
  name: string;
  price: number;
  promotion: boolean;
}

// interface de pagination
export interface PageProducts {
  products: Product[];
  page: number;
  size: number;
  totalPages:number;
}

