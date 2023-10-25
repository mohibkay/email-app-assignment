import { useEffect, useState } from "react";
import "./App.css";
import EmailDetails from "./components/ui/EmailDetails";
import { useGetEmailListQuery } from "./services/emailList";
import { useDispatch, useSelector } from "react-redux";
import { setList, setSelectedEmail } from "./emailListSlice";
import FilterBar from "./components/ui/FilterBar";
import EmailList from "./components/ui/EmailList";
import Spinner from "./components/utils/Spinner";
import Pagination from "./components/ui/Pagination";
import { persistor } from "./store";

function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState("");
  const { data, isFetching } = useGetEmailListQuery(page);

  const selectedEmail = useSelector((state) => state.emailList.selectedEmail);

  const emailListView = selectedEmail
    ? "grid-cols-1 md:grid-cols-3"
    : "grid-cols-1";
  const emailList = useSelector((state) => state.emailList.list);
  const [filteredEmailList, setFilteredEmailList] = useState([...emailList]);
  const isOpenInSidePane = !!selectedEmail;

  useEffect(() => {
    if (data) {
      dispatch(setList(data?.list));
      persistor.persist();
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
    dispatch(setSelectedEmail(null));
  }, [filterBy]);

  return (
    <div className='p-6 h-screen'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
          <FilterBar filterBy={filterBy} setFilterBy={setFilterBy} />
          {!isFetching && (
            <Pagination
              page={page}
              setPage={setPage}
              emailCount={data.list.length}
              totalEmailCount={data.total}
            />
          )}
        </div>
        <div className={`grid ${emailListView} gap-0 md:gap-6`}>
          {isFetching ? (
            <Spinner />
          ) : (
            <EmailList
              isOpenInSidePane={isOpenInSidePane}
              filteredEmailList={filteredEmailList}
            />
          )}

          {isOpenInSidePane && (
            <div className='col-span-2'>
              <EmailDetails />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
