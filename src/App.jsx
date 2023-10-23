import { useEffect, useState } from "react";
import "./App.css";
import EmailBody from "./components/EmailBody";
import { useGetEmailListQuery } from "./services/emailList";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "./emailListSlice";
import FilterBar from "./components/FilterBar";
import EmailList from "./components/EmailList";

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
          <EmailList
            filteredEmailList={filteredEmailList}
            selectedEmail={selectedEmail}
            setSelectedEmail={setSelectedEmail}
          />

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
