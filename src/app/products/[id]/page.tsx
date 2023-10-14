import { prisma } from "@/lib/db/prisma";
import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: Props) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return (
    <div className="flex flex-col lg:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
      />
    </div>
  );
};

export default ProductPage;
