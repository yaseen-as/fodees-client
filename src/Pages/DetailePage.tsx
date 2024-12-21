import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestourent } from "@/api/RestourentApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestourantInfo from "@/components/RestourantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-forms/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function DetailePage() {
  const { restourentId } = useParams();
  const { restourant, isLoading } = useGetRestourent(restourentId);
  const { createCheckoutSession, isPending: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restourentId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const onCheackout =async (userFormData: UserFormData) => {
    if(!restourant){
      return;
    }
    console.log("userformData", userFormData);
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restourantId: restourant._id,
      deliveryDetails: {
        name:userFormData.name,
        addressLine:userFormData.adressLine,
        city:userFormData.city,
        country:userFormData.country,
        email:userFormData.email as string,
      },
    };
    const data = await createCheckoutSession(checkoutData)
    window.location.href=data.url;
  };
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItem) => {
      const existingCartItem = prevCartItem?.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItem;
      if (existingCartItem) {
        updatedCartItem = prevCartItem?.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItem = [
          ...prevCartItem,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restourentId}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedCartItem;
    });
  };
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItem) => {
      const updatedCartItem = prevCartItem.filter(
        (item) => cartItem._id !== item._id
      );
      sessionStorage.setItem(
        `cartItems-${restourentId}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedCartItem;
    });
  };

  if (isLoading || !restourant) {
    return "Loading";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restourant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32 ">
        <div className="flex flex-col gap-4">
          <RestourantInfo restourant={restourant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restourant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restourant={restourant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItems.length === 0}
                onCheackout={onCheackout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
