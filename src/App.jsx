import "./App.css";
import EmailItem from "./components/email-item";

function App() {
  return (
    <div className='p-6'>
      <div className='space-y-6'>
        {[...Array(10)].map((item) => (
          <EmailItem key={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
