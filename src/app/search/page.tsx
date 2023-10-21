import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import React from "react";

interface Props {
  searchParams: {
    query: string;
  };
}

export function generateMetadata({ searchParams: { query } }: Props): Metadata {
  return {
    title: `Search: ${query} - Flowmazon`,
  };
}

const SearchPage = async ({ searchParams: { query } }: Props) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0)
    return <div className="text-center">No products found</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SearchPage;
