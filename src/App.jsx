import { useState } from "react";
import "./App.css";
import EmailBody from "./components/email-body";
import EmailItem from "./components/email-item";
import { useGetEmailListQuery } from "./services/emailList";

function App() {
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  console.log("🐬 ~ App ~ selectedEmailId:", selectedEmailId);
  const { data: emailList } = useGetEmailListQuery();
  const emailListView = selectedEmailId ? "grid-cols-3" : "grid-cols-1";

  return (
    <div className={`p-6 grid ${emailListView} gap-6`}>
      <div className='space-y-6 col-span-1 h-screen sticky overflow-y-auto no-scrollbar pb-16'>
        {emailList?.list.map(
          ({
            date,
            from: { name, email },
            id,
            short_description: shortDescription,
            subject,
          }) => (
            <EmailItem
              key={id}
              date={date}
              name={name}
              email={email}
              shortDescription={shortDescription}
              subject={subject}
              isSelected={selectedEmailId === id}
              handleClick={() => setSelectedEmailId(id)}
            />
          )
        )}
      </div>
      {selectedEmailId && (
        <div className='col-span-2'>
          <EmailBody selectedEmailId={selectedEmailId} />
        </div>
      )}
    </div>
  );
}

export default App;
