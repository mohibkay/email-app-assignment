import "./App.css";
import EmailBody from "./components/email-body";
import EmailItem from "./components/email-item";
import { useGetEmailListQuery } from "./services/emailList";

function App() {
  const { data: emailList, error, isLoading } = useGetEmailListQuery();
  console.log("🐬 ~ App ~ data:", emailList, error, isLoading);

  return (
    <div className='p-6 grid grid-cols-3 gap-6'>
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
            />
          )
        )}
      </div>
      <div className='col-span-2'>
        <EmailBody />
      </div>
    </div>
  );
}

export default App;
