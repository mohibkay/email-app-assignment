import { useState } from "react";
import "./App.css";
import EmailBody from "./components/email-body";
import EmailItem from "./components/email-item";
import { useGetEmailListQuery } from "./services/emailList";

function App() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const { data: emailList } = useGetEmailListQuery();
  const emailListView = selectedEmail ? "grid-cols-3" : "grid-cols-1";

  return (
    <div className={`p-6 grid ${emailListView} gap-6`}>
      <div className='space-y-6 col-span-1 h-screen sticky overflow-y-auto no-scrollbar pb-16'>
        {emailList?.list.map((emailItem) => {
          const {
            date,
            from: { name, email },
            id,
            short_description: shortDescription,
            subject,
          } = emailItem;
          return (
            <EmailItem
              key={id}
              date={date}
              name={name}
              email={email}
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
            selectedEmailId={selectedEmail.id}
            date={selectedEmail.date}
            name={selectedEmail.from.name}
            subject={selectedEmail.subject}
          />
        </div>
      )}
    </div>
  );
}

export default App;
