import PropTypes from "prop-types";

const Pagination = ({ page, setPage }) => {
  const leftArrowColor = page === 1 ? "text-faded" : "text-black";
  const rightArrowColor = page === 2 ? "text-faded" : "text-black";

  const updatePageNumber = (count) => {
    setPage(count);
  };

  return (
    <div className='flex items-center space-x-3'>
      <button disabled={page === 1} onClick={() => updatePageNumber(1)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={`w-6 h-6 ${leftArrowColor}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      </button>

      <button disabled={page === 2} onClick={() => updatePageNumber(2)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className={`w-6 h-6 ${rightArrowColor}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
