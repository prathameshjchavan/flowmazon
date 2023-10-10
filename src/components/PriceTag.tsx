import { formatPrice } from "@/lib/format";
import React from "react";

interface Props {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: Props) => {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
};

export default PriceTag;
