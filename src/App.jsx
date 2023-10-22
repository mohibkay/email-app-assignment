import "./App.css";
import EmailBody from "./components/email-body";
import EmailItem from "./components/email-item";

function App() {
  return (
    <div className='p-6 grid grid-cols-3 gap-6'>
      <div className='space-y-6 col-span-1 h-screen sticky overflow-y-auto no-scrollbar pb-16'>
        {[...Array(10)].map((_, idx) => (
          <EmailItem key={idx} />
        ))}
      </div>
      <div className='col-span-2'>
        <EmailBody />
      </div>
    </div>
  );
}

export default App;
