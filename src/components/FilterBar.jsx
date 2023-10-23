import PropTypes from "prop-types";

const FilterBar = ({ filterBy, setFilterBy }) => {
  return (
    <div className='flex items-center space-x-2 mb-6'>
      Filter By:
      <button
        onClick={() => setFilterBy("unread")}
        className={`${
          filterBy === "unread" ? "bg-filter-btn text-primary-foreground" : ""
        } rounded-full px-4 ml-6`}
      >
        Unread
      </button>
      <button
        onClick={() => {
          setFilterBy("read");
        }}
        className={`${
          filterBy === "read" ? "bg-filter-btn text-primary-foreground" : ""
        } rounded-full px-4`}
      >
        Read
      </button>
      <button
        onClick={() => setFilterBy("favorite")}
        className={`${
          filterBy === "favorite" ? "bg-filter-btn text-primary-foreground" : ""
        } rounded-full px-4`}
      >
        Favorites
      </button>
      {filterBy && (
        <button className='ml-4' onClick={() => setFilterBy("")}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

FilterBar.propTypes = {
  filterBy: PropTypes.string.isRequired,
  setFilterBy: PropTypes.func.isRequired,
};

export default FilterBar;
