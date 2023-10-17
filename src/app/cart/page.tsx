import { getCart } from "@/lib/db/cart";
import React from "react";
import CartEntry from "./CartEntry";

type Props = {};

export const metadata = {
  title: "Your Cart - Flowmazon",
};

const CartPage = async (props: Props) => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry key={cartItem.id} cartItem={cartItem} />
      ))}
    </div>
  );
};

export default CartPage;
