import Link from "next/link";
import React, { Fragment } from "react";

interface Props {
  currentPage: number;
  totalPages: number;
}

const PaginationBar = ({ currentPage, totalPages }: Props) => {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));
  const numberedPageItems: JSX.Element[] = [];

  for (let page = minPage; page < maxPage; page++) {
    numberedPageItems.push(
      <Link
        key={page}
        href={`?page=${page}`}
        className={`btn join-item ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>,
    );
  }

  return (
    <Fragment>
      <div className="join hidden sm:block">{numberedPageItems}</div>
      <div className="join sm:hidden">
        {currentPage > 1 && (
          <Link href={`?page=${currentPage - 1}`} className="btn join-item">
            «
          </Link>
        )}
        <button className="btn join-item pointer-events-none">
          Page {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={`?page=${currentPage + 1}`} className="btn join-item">
            »
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default PaginationBar;
