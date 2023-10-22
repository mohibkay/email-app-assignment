import { useState } from "react";
import { formatDateFromEpoch } from "../lib/utils";
import HTMLParser from "html-to-json-parser";

const EmailBody = () => {
  const [bodyInJson, setBodyInJson] = useState([]);
  const subject = "Lorem Ipsum";
  const date = 1582729505000;

  const body =
    "<div><p>Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae consequat arcu lacus ac magna. Nunc euismod in magna eget molestie. Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt elit.</p><p>Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus a nulla id posuere. Donec ultricies cursus metus, at egestas tortor dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor magna.</p><p>Phasellus eu purus hendrerit, blandit ante ut, rhoncus neque. Nullam mattis non velit nec bibendum. Morbi commodo enim nec semper ultrices. Pellentesque sit amet vestibulum leo. Pellentesque blandit diam in placerat viverra. Phasellus posuere velit mauris, et auctor lectus scelerisque eu. Cras turpis lorem, gravida quis congue id, tristique non lorem. Proin sit amet eros sit amet ligula vehicula faucibus nec quis ipsum. Nullam semper urna sit amet justo iaculis porta. Nullam commodo libero pulvinar, faucibus dui in, viverra ante. Duis vel leo neque.</p><p>Quisque rhoncus dignissim tincidunt. Duis ornare enim pretium imperdiet iaculis. Fusce finibus turpis non lacus convallis vehicula. Quisque et porta orci. Quisque sed erat at diam feugiat viverra. Vestibulum dignissim velit interdum nibh consectetur venenatis. Sed sodales blandit facilisis. Duis elementum, justo at vehicula tempor, libero quam malesuada magna, et fermentum arcu diam vel elit. Pellentesque sollicitudin egestas varius. Vestibulum efficitur tortor eu dolor mollis fringilla. Aliquam tincidunt ornare leo. Pellentesque malesuada urna magna, sed imperdiet leo vehicula eu. In a odio sit amet magna lobortis aliquet a ac est.</p></div>";

  async function htmlToJson() {
    let result = await HTMLParser(body, true); // Default: false - true: return JSON, false: return JS Object
    setBodyInJson(JSON.parse(result));

    return result;
  }

  htmlToJson();

  return (
    <div className='flex gap-4 border h-[calc(100vh-36px)] bg-white border-grayBorder cursor-pointer px-4 py-4 rounded-lg'>
      <div className='h-12 w-12 rounded-full shrink-0 bg-highlight text-white grid place-content-center text-xl font-semibold'>
        F
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

export default EmailBody;
