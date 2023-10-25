import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setSelectedEmail, toggleReadStatus } from "../../emailListSlice";
import { formatDateFromEpoch } from "../../lib/utils";
import { persistor } from "../../store";

const EmailItem = ({ emailItem, isSelected, isOpenInSidePane }) => {
  const {
    id,
    date,
    from: { name, email },
    isRead,
    isFavorite,
    short_description: shortDescription,
    subject,
  } = emailItem;
  const highlightSelectedEmail = isSelected ? "border-highlight" : "";
  const readEmaiBg = isRead ? "bg-read-background" : "bg-white";
  const textMaxWidth = isOpenInSidePane ? "max-w-[32ch]" : "";
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(toggleReadStatus(id));
        dispatch(setSelectedEmail(emailItem));
        persistor.persist();
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
  isSelected: PropTypes.bool.isRequired,
  isOpenInSidePane: PropTypes.bool.isRequired,
  emailItem: PropTypes.shape({
    date: PropTypes.number.isRequired,
    from: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isRead: PropTypes.bool.isRequired,
    short_description: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
  }).isRequired,
};

export default EmailItem;
