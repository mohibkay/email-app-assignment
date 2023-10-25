import { useEffect, useState } from "react";
import { formatDateFromEpoch } from "../../lib/utils";
import HTMLParser from "html-to-json-parser";
import { useGetEmailDetailsQuery } from "../../services/emailDetails";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteStatus, setSelectedEmail } from "../../emailListSlice";
import Spinner from "../utils/Spinner";

const EmailDetails = () => {
  const selectedEmail = useSelector((state) => state.emailList.selectedEmail);
  const persistedEmail = useSelector((state) => state.emailList.emailStatus);
  const isFavoriteEmail = persistedEmail?.find(
    (email) => email.id === selectedEmail.id
  ).isFavorite;
  const {
    id: selectedEmailId,
    date,
    from: { name },
    subject,
  } = selectedEmail;

  const dispatch = useDispatch();
  const [bodyInJson, setBodyInJson] = useState([]);
  const skip = !selectedEmailId;
  const { data, isFetching } = useGetEmailDetailsQuery(selectedEmailId, {
    skip,
  });

  async function htmlToJson(body) {
    let result = await HTMLParser(body, true);
    setBodyInJson(JSON.parse(result));
    return result;
  }

  function hideEmailDetails() {
    dispatch(setSelectedEmail(null));
  }

  useEffect(() => {
    try {
      if (data) {
        htmlToJson(data?.body);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedEmailId, data]);

  const handleMarkFavorite = () => {
    dispatch(toggleFavoriteStatus(selectedEmailId));
  };

  return (
    <div className='flex flex-col md:flex-row gap-col-4 md:gap-row-4 border h-screen md:h-[calc(100vh-98px)] bg-white border-grayBorder cursor-pointer px-4 pb-6 pt-6 rounded-lg absolute inset-0 overflow-y-scroll no-scrollbar md:static'>
      <button className='md:hidden' onClick={hideEmailDetails}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
          />
        </svg>
      </button>

      <div className='space-y-2 w-full px-4 pb-5 pr-5 flex flex-col sticky top-0'>
        <header className='flex flex-col md:flex-row justify-between md:gap-6'>
          <div className='h-12 w-12 mx-auto md:mx-0 uppercase rounded-full shrink-0 bg-highlight text-white grid place-content-center text-xl font-semibold'>
            {name[0]}
          </div>

          <section className='space-y-1 flex flex-col md:flex-row flex-1 items-center md:items-start justify-between mb-6 md:mb-0'>
            <div className='mb-4 mt-2 md:mt-0'>
              <span className='text-primary-foreground md:mb-4 text-3xl font-semibold block'>
                {subject}
              </span>
              <span className='text-primary-foreground block text-center md:text-start'>
                {formatDateFromEpoch(date)}
              </span>
            </div>
            <button
              onClick={handleMarkFavorite}
              className='bg-highlight text-white rounded-full px-4 py-1.5 font-medium text-xs'
            >
              {isFavoriteEmail ? "Remove from Favorite" : "Mark as favorite"}
            </button>
          </section>
        </header>

        {isFetching ? (
          <Spinner />
        ) : (
          <div className='mt-8 md:mt-0 flex flex-1 gap-6 md:gap-row-0'>
            <div className='w-12 shrink-0 hidden md:inline'></div>
            <div className='space-y-4 h-[calc(100svh-268px)] md:h-[calc(100vh-240px)] overflow-y-auto'>
              {bodyInJson?.content?.map((item, idx) => (
                <p className='text-primary-foreground text-sm' key={item + idx}>
                  {item.content}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailDetails;
