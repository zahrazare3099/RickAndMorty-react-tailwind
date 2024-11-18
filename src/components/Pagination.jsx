const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <nav className="w-full py-4">
      <ul className="pagination flex space-x-2 justify-center w-full">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={` rounded-full px-2 transition-colors duration-200 ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            <button
              onClick={() => onPageChange(number)}
              className="page-link p-0"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Pagination;
