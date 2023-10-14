import { prisma } from "@/lib/db/prisma";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: Props) => {
  const product = await prisma.product.findUnique({ where: { id } });
  return <div>ProductPage</div>;
};

export default ProductPage;
