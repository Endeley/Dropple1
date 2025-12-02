export default function Pagination({ page, totalPages, onPageChange }) {
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="pagination">
      <button
        onClick={() => !prevDisabled && onPageChange(page - 1)}
        disabled={prevDisabled}
      >
        Previous
      </button>
      <div className="pagination-text">
        Page <span style={{ color: "#fff", fontWeight: 700 }}>{page}</span> of{" "}
        <span style={{ color: "#fff", fontWeight: 700 }}>{totalPages}</span>
      </div>
      <button
        onClick={() => !nextDisabled && onPageChange(page + 1)}
        disabled={nextDisabled}
      >
        Next
      </button>
    </div>
  );
}
