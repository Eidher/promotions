interface ProductInventory {
  _id: string;
  _productId: string;
  qty: number;
  updatedAt: string;
}

interface PromotionType {
  _id: string;
  name: string;
  updatedAt: string;
}

interface Promotion {
  _id: string;
  amount: number;
  comparison: string;
  value: any;
  _promotionTypeId: string;
  promotionType: PromotionType;
  updatedAt: string;
}

interface Product {
  _id: string;
  sku: string;
  name: string;
  price: number;
  inventory?: ProductInventory;
  promotion?: Promotion;
  updatedAt: string;
  createdAt: string;
  qty?: number;
  subtotal?: number;
  hasPromotion: boolean;
}

interface CartPromotion {
  description: string;
  original: number;
  new: number;
}
