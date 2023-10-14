import { prisma } from "@/lib/db/prisma";
import React, { cache } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";

interface Props {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: `${product.name} - Flowmazon`,
    description: product.description,
    openGraph: { images: [{ url: product.imageUrl }] },
  };
}

const ProductPage = async ({ params: { id } }: Props) => {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="my-6">{product.description}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};

export default ProductPage;
