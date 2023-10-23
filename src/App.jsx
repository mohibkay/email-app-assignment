import { useEffect, useState } from "react";
import "./App.css";
import EmailBody from "./components/EmailBody";
import EmailItem from "./components/EmailItem";
import { useGetEmailListQuery } from "./services/emailList";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "./emailListSlice";
import FilterBar from "./components/FilterBar";

function App() {
  const dispatch = useDispatch();
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const { data } = useGetEmailListQuery();
  const emailListView = selectedEmail ? "grid-cols-3" : "grid-cols-1";
  const emailList = useSelector((state) => state.emailList.list);
  const [filteredEmailList, setFilteredEmailList] = useState([...emailList]);
  console.log("🐬 ~ App ~ filteredEmailList:", filteredEmailList);

  useEffect(() => {
    if (data) {
      dispatch(setList(data?.list));
    }
  }, [dispatch, data]);

  useEffect(() => {
    let filteredList = emailList;
    switch (filterBy) {
      case "favorite":
        filteredList = emailList.filter((email) => email.isFavorite);
        break;
      case "read":
        filteredList = emailList.filter((email) => email.isRead);
        break;
      case "unread":
        filteredList = emailList.filter((email) => !email.isRead);
        break;
      default:
        filteredList = emailList;
    }
    setFilteredEmailList(filteredList);
  }, [emailList, filterBy]);

  useEffect(() => {
    setSelectedEmail(null);
  }, [filterBy]);

  return (
    <div className='p-6'>
      <div className='max-w-7xl mx-auto'>
        <FilterBar filterBy={filterBy} setFilterBy={setFilterBy} />
        <div className={`grid ${emailListView} gap-6`}>
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
          {selectedEmail && (
            <div className='col-span-2'>
              <EmailBody
                isFavorite={selectedEmail.isFavorite}
                selectedEmailId={selectedEmail.id}
                date={selectedEmail.date}
                name={selectedEmail.from.name}
                subject={selectedEmail.subject}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
