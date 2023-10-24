import { useEffect, useState } from "react";
import { formatDateFromEpoch } from "../../lib/utils";
import HTMLParser from "html-to-json-parser";
import { useGetEmailDetailsQuery } from "../../services/emailDetails";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteStatus } from "../../emailListSlice";
import Spinner from "../utils/Spinner";

const EmailDetails = () => {
  const selectedEmail = useSelector((state) => state.emailList.selectedEmail);
  const {
    id: selectedEmailId,
    date,
    from: { name },
    isFavorite,
    subject,
  } = selectedEmail;
  console.log("🐬 ~ EmailDetails ~ selectedEmail:", selectedEmail);
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
    <div className='flex gap-4 border h-[calc(100vh-84px)] bg-white border-grayBorder cursor-pointer px-4 py-4 rounded-lg'>
      <div className='h-12 w-12 uppercase rounded-full shrink-0 bg-highlight text-white grid place-content-center text-xl font-semibold'>
        {name[0]}
      </div>

      <div className='space-y-2 w-full px-4 flex flex-col'>
        <header className='space-y-1 sticky flex items-center justify-between  mb-6'>
          <div>
            <span className='text-primary-foreground mb-4 text-3xl font-semibold block'>
              {subject}
            </span>
            <span className='text-primary-foreground block'>
              {formatDateFromEpoch(date)}
            </span>
          </div>
          <button
            onClick={handleMarkFavorite}
            className='bg-highlight text-white rounded-full px-4 py-1.5 font-medium text-sm'
          >
            {isFavorite ? "Remove from Favorite" : "Mark as favorite"}
          </button>
        </header>

        {isFetching ? (
          <Spinner />
        ) : (
          <div className='space-y-4 mt-8 flex-1 overflow-auto '>
            {bodyInJson?.content?.map((item, idx) => (
              <p className='text-primary-foreground text-sm' key={item + idx}>
                {item.content}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

EmailDetails.propTypes = {
  selectedEmailId: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default EmailDetails;
