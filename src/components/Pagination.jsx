import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calculate total number of pages needed based on total items and items per page.
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Determine which page numbers to show around the current page for a cleaner UI.
  // This logic prevents showing too many page buttons.
  const maxPageButtons = 5; // Maximum number of numbered page buttons to display.
  let startPage, endPage;

  if (pageNumbers.length <= maxPageButtons) {
    // If total pages are less than or equal to the maximum, show all page numbers.
    startPage = 1;
    endPage = pageNumbers.length;
  } else {
    // If there are more pages than `maxPageButtons`, implement truncation.
    const maxPagesBeforeCurrentPage = Math.floor(maxPageButtons / 2); // How many buttons before current
    const maxPagesAfterCurrentPage = Math.ceil(maxPageButtons / 2) - 1; // How many buttons after current

    if (currentPage <= maxPagesBeforeCurrentPage) {
      // If current page is near the beginning, show first `maxPageButtons` pages.
      startPage = 1;
      endPage = maxPageButtons;
    } else if (currentPage + maxPagesAfterCurrentPage >= pageNumbers.length) {
      // If current page is near the end, show last `maxPageButtons` pages.
      startPage = pageNumbers.length - maxPageButtons + 1;
      endPage = pageNumbers.length;
    } else {
      // If current page is in the middle, center `maxPageButtons` around it.
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // Extract the specific page numbers that will be displayed based on `startPage` and `endPage`.
  const displayedPageNumbers = pageNumbers.slice(startPage - 1, endPage);

  if (pageNumbers.length <= 1) {
    return null; // Don't show pagination if there's only one page or no pages
  }

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <div className="flex items-center gap-2">
        {/* First Page Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(1)} 
          className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500"
          disabled={currentPage === 1}
        >
          <ChevronsLeft size={16} />
        </motion.button>

        {/* Previous Page Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(currentPage - 1)} 
          className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500"
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {/* First Page and Ellipsis */}
          {startPage > 1 && (
            <>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(1)} 
                className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500"
              >
                1
              </motion.button>
              {startPage > 2 && (
                <span className="px-2 text-slate-400">...</span>
              )}
            </>
          )}

          {/* Displayed Page Numbers */}
          {displayedPageNumbers.map(number => (
            <motion.button 
              key={number} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(number)} 
              className={`btn btn-sm ${
                currentPage === number 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400 shadow-lg shadow-cyan-500/25' 
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500'
              }`}
            >
              {number}
            </motion.button>
          ))}

          {/* Last Page and Ellipsis */}
          {endPage < pageNumbers.length && (
            <>
              {endPage < pageNumbers.length - 1 && (
                <span className="px-2 text-slate-400">...</span>
              )}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(pageNumbers.length)} 
                className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500"
              >
                {pageNumbers.length}
              </motion.button>
            </>
          )}
        </div>

        {/* Next Page Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(currentPage + 1)} 
          className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500"
          disabled={currentPage === pageNumbers.length}
        >
          <ChevronRight size={16} />
        </motion.button>

        {/* Last Page Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate(pageNumbers.length)} 
          className="btn btn-sm bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500"
          disabled={currentPage === pageNumbers.length}
        >
          <ChevronsRight size={16} />
        </motion.button>
      </div>

      {/* Page Info */}
      <div className="ml-4 text-sm text-slate-400">
        Page {currentPage} of {pageNumbers.length}
      </div>
    </div>
  );
};

export default Pagination;

