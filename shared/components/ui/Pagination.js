"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

function getVisiblePages(currentPage, totalPages) {
  const pages = [];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  return pages;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="pagination">
      <button
        type="button"
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>

      {pages[0] > 1 && (
        <>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-gray-100 bg-white px-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            ۱
          </button>
          {pages[0] > 2 && <span className="px-1 text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold transition ${
            page === currentPage
              ? "bg-blue-600 text-white shadow-sm"
              : "border border-gray-100 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
          }`}
        >
          {page.toLocaleString("fa-IR")}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="px-1 text-gray-400">...</span>}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="flex h-10 min-w-10 items-center justify-center rounded-xl border border-gray-100 bg-white px-3 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            {totalPages.toLocaleString("fa-IR")}
          </button>
        </>
      )}

      <button
        type="button"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>
    </nav>
  );
}
