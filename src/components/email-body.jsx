import { useEffect, useState } from "react";
import { formatDateFromEpoch } from "../lib/utils";
import HTMLParser from "html-to-json-parser";
import { useGetEmailBodyQuery } from "../services/emailBody";
import PropTypes from "prop-types";
import Spinner from "./spinner";

const EmailBody = ({ selectedEmailId, date, name, subject }) => {
  const [bodyInJson, setBodyInJson] = useState([]);
  const skip = !selectedEmailId;
  const { data, isLoading } = useGetEmailBodyQuery(selectedEmailId, { skip });

  async function htmlToJson(body) {
    let result = await HTMLParser(body, true);
    setBodyInJson(JSON.parse(result));
    return result;
  }

  useEffect(() => {
    if (data) {
      htmlToJson(data?.body);
    }
  }, [selectedEmailId, data]);

  if (isLoading) return <Spinner />;

  return (
    <div className='flex gap-4 border h-[calc(100vh-36px)] bg-white border-grayBorder cursor-pointer px-4 py-4 rounded-lg'>
      <div className='h-12 w-12 uppercase rounded-full shrink-0 bg-highlight text-white grid place-content-center text-xl font-semibold'>
        {name[0]}
      </div>

      <div className='space-y-2 w-full px-4'>
        <header className='space-y-1 flex items-center justify-between'>
          <div>
            <span className='text-primary-foreground mb-4 text-3xl font-semibold block'>
              {subject}
            </span>
            <span className='text-primary-foreground block'>
              {formatDateFromEpoch(date)}
            </span>
          </div>
          <button className='bg-highlight text-white rounded-full px-4 py-1.5 font-medium text-sm'>
            Mark as favorite
          </button>
        </header>

        <>
          {bodyInJson?.content?.map((item, idx) => (
            <p key={item + idx}>{item.content}</p>
          ))}
        </>
      </div>
    </div>
  );
};

EmailBody.propTypes = {
  selectedEmailId: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
};

export default EmailBody;
