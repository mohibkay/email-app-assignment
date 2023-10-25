import PropTypes from "prop-types";
import { calculateEmailRange } from "../../lib/utils";

const Pagination = ({ page, setPage, emailCount, totalEmailCount }) => {
  const leftArrowColor = page === 1 ? "text-faded" : "text-black";
  const rightArrowColor = page === 2 ? "text-faded" : "text-black";

  const updatePageNumber = (count) => {
    setPage(count);
  };

  return (
    <div className='flex items-center space-x-3'>
      <div>
        <span>{calculateEmailRange(page, emailCount, totalEmailCount)}</span>
      </div>
      <button disabled={page === 1} onClick={() => updatePageNumber(1)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className={`w-5 h-5 ${leftArrowColor}`}
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
          strokeWidth='2'
          stroke='currentColor'
          className={`w-5 h-5 ${rightArrowColor}`}
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
  emailCount: PropTypes.number.isRequired,
  totalEmailCount: PropTypes.number.isRequired,
};

export default Pagination;
