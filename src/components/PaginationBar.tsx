"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { Fragment } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
}

const PaginationBar = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
  const numberedPageItems: JSX.Element[] = [];

  const addPageQueryParam = (page: number) => {
    const query = new URLSearchParams(Array.from(searchParams.entries()));
    query.set("page", page.toString());
    router.push(`${pathname}?${query}`);
  };

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <button
        key={page}
        onClick={() => addPageQueryParam(page)}
        className={`btn join-item ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </button>,
    );
  }

  return (
    <Fragment>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join sm:hidden">
        {currentPage > 1 && (
          <button
            onClick={() => addPageQueryParam(currentPage - 1)}
            className="btn join-item"
          >
            «
          </button>
        )}
        <button className="btn join-item pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <button
            onClick={() => addPageQueryParam(currentPage - 1)}
            className="btn join-item"
          >
            »
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default PaginationBar;
