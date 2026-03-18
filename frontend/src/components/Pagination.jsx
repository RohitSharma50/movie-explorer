// Props:
//   currentPage  — number
//   totalPages   — number
//   onPageChange — function(newPage)

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Build visible page numbers (show 5 around current)
  const getPages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const btnBase =
    "w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200";

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} border border-cinema-border text-cinema-subtext
          hover:border-cinema-accent hover:text-cinema-accent
          disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Previous page"
      >
        ‹
      </button>

      {/* Page numbers */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`dot-${i}`} className="text-cinema-muted px-1">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${
              page === currentPage
                ? "bg-cinema-accent text-cinema-black border border-cinema-accent font-semibold"
                : "border border-cinema-border text-cinema-subtext hover:border-cinema-accent hover:text-cinema-accent"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} border border-cinema-border text-cinema-subtext
          hover:border-cinema-accent hover:text-cinema-accent
          disabled:opacity-30 disabled:cursor-not-allowed`}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
