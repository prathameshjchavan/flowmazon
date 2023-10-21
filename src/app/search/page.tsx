import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import React from "react";

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

export function generateMetadata({ searchParams: { query } }: Props): Metadata {
  return {
    title: `Search: ${query} - Flowmazon`,
  };
}

const SearchPage = async ({ searchParams: { query, page = "1" } }: Props) => {
  const currentPage = Number(page);
  const pageSize = 6;
  const totalItemCount = await prisma.product.count({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });
  const totalPages = Math.ceil(totalItemCount / pageSize);
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: { id: "desc" },
  });

  if (totalItemCount === 0)
    return <div className="text-center">No products found</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
};

export default SearchPage;
