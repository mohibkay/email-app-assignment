import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import EmailItem from "./EmailItem";

const EmailList = ({ isOpenInSidePane, filteredEmailList }) => {
  const selectedEmail = useSelector((state) => state.emailList.selectedEmail);
  const hideEmailListOnMobile = selectedEmail ? "hidden md:block" : "";

  return (
    <div
      className={`space-y-6 col-span-1 h-[calc(100vh-84px)] sticky overflow-y-auto no-scrollbar pb-4 ${hideEmailListOnMobile}`}
    >
      {filteredEmailList?.map((emailItem) => {
        const { id } = emailItem;

        return (
          <EmailItem
            key={id}
            emailItem={emailItem}
            isOpenInSidePane={isOpenInSidePane}
            isSelected={selectedEmail?.id === id}
          />
        );
      })}
    </div>
  );
};

EmailList.propTypes = {
  isOpenInSidePane: PropTypes.bool.isRequired,
  filteredEmailList: PropTypes.array.isRequired,
};

export default EmailList;
