import { useDispatch } from "react-redux";
import { toggleReadStatus } from "../../emailListSlice";
import { formatDateFromEpoch } from "../../lib/utils";
import PropTypes from "prop-types";

const EmailItem = ({
  id,
  date,
  name,
  email,
  isRead,
  isFavorite,
  shortDescription,
  subject,
  isSelected,
  handleClick,
  isOpenInSidePane,
}) => {
  const highlightSelectedEmail = isSelected ? "border-highlight" : "";
  const readEmaiBg = isRead ? "bg-read-background" : "bg-white";
  const textMaxWidth = isOpenInSidePane ? "max-w-[32ch]" : "";
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(toggleReadStatus(id));
        handleClick();
      }}
      className={`flex items-start gap-4 border hover:shadow-xl cursor-pointer px-6 py-3 rounded-lg ${highlightSelectedEmail} ${readEmaiBg}`}
    >
      <div className='h-12 w-12 shrink-0 uppercase rounded-full bg-highlight text-white grid place-content-center text-xl font-semibold'>
        {name[0]}
      </div>

      <div className='space-y-2'>
        <header className='space-y-1'>
          <div className={`text-sm truncate ${textMaxWidth}`}>
            <span className='text-primary-foreground mr-1'>From:</span>
            <span className='text-primary-foreground font-semibold'>{`${name} <${email}>`}</span>
          </div>
          <div className={`text-sm truncate ${textMaxWidth}`}>
            <span className='text-primary-foreground mr-1'>Subject:</span>{" "}
            <span className='text-primary-foreground font-semibold'>
              {subject}
            </span>
          </div>
        </header>
        <p
          className={`text-sm text-primary-foreground truncate ${textMaxWidth}`}
        >
          {shortDescription}
        </p>
        <div className='flex items-center text-sm'>
          <p className='text-primary-foreground'>{formatDateFromEpoch(date)}</p>
          {isFavorite && (
            <button className='bg-none text-highlight font-semibold text-sm ml-6'>
              Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

EmailItem.propTypes = {
  isRead: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isOpenInSidePane: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default EmailItem;
