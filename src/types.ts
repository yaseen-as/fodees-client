export type User = {
  _id: string;
  email: string;
  name: string;
  adressLine: string;
  city: string;
  contry: string;
};
export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type OrderStatus="placed"| "paid"| "inProgress"| "outForDelivery"| "delivered";

export type Order = {
  _id: string;
  restaurant: Restourent;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails:{
    name:string;
    addressLine:string;
    city:string;
    email:string;
  };
  totalAmount:number;
  status:OrderStatus;
  createdAt:string;
};

export type Restourent = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};
export type RestourentSearchResponse = {
  data: Restourent[];
  pagination: { total: number; page: number; pages: number };
};
