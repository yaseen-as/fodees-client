export type User={
    _id:string;
    email:string;
    name:string;
    adressLine:string;
    city:string;
    contry:string;
}
export type MenuItem={
    _id:string
    name:string;
    price:number
}

export type Restourent={
    _id:string;
    user:string;
    restaurantName:string;
    city:string;
    country:string;
    deliveryPrice:number;
    estimatedDeliveryTime:number;
    cuisines:string[];
    menuItems:MenuItem[];
    imageUrl:string;
    lastUpdated:string;
}