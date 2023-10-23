import PropTypes from "prop-types";
import EmailItem from "./EmailItem";

const EmailList = ({ filteredEmailList, selectedEmail, setSelectedEmail }) => {
  return (
    <div className='space-y-6 col-span-1 h-screen sticky overflow-y-auto no-scrollbar pb-16'>
      {filteredEmailList?.map((emailItem) => {
        const {
          date,
          from: { name, email },
          id,
          short_description: shortDescription,
          subject,
          isRead,
          isFavorite,
        } = emailItem;

        return (
          <EmailItem
            key={id}
            date={date}
            name={name}
            email={email}
            id={id}
            isRead={isRead}
            isFavorite={isFavorite}
            shortDescription={shortDescription}
            subject={subject}
            isSelected={selectedEmail?.id === id}
            handleClick={() => setSelectedEmail(emailItem)}
          />
        );
      })}
    </div>
  );
};

EmailList.propTypes = {
  filteredEmailList: PropTypes.array.isRequired,
  selectedEmail: PropTypes.object,
  setSelectedEmail: PropTypes.func.isRequired,
};

export default EmailList;
