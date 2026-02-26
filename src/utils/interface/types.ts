export type SearchParams = {
  [key: string]: string | undefined;
};

export type UserInfo = {
  user: {
    user_metadata: {
      email: string;
      email_verified: boolean;
      phone_verified: boolean;
      sub: string;
      display_name?: string;
    };
  };
};

export type ErrorResponse = {
  message: string;
  statusCode: number;
};

export type CartItem = {
  game_id: number;
  cart_id: string;
  order_id: null;
};

export type OrderItem = {
  cart_id: string;
  created_at: string;
  id: number;
  user_id: string;
  total: number;
  qty: number;
  items: string;
};

export type LineProduct = {
  adjustable_quantity: number;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  id: string;
  metadata: {};
  object: string;
  price: {};
  quantity: number;
};
export type LineItem = {
  data: LineProduct[];
  has_more: boolean;
  object: string;
  url: string;
};
