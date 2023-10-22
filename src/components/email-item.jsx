import { formatDateFromEpoch } from "../lib/utils";

const EmailItem = () => {
  const name = "Foo Bar";
  const email = "foo.bar@gmail.com";
  const subject = "Lorem Ipsum";
  const shortDescription =
    "Vestibulum sit amet ipsum aliquet, lacinia nulla malesuada, ullamcorper massa";
  const date = 1582729505000;

  return (
    <div className='flex gap-4 border bg-white hover:border-highlight cursor-pointer px-4 py-3 rounded-lg'>
      <div className='h-12 w-12 rounded-full bg-highlight text-white grid place-content-center text-xl font-semibold'>
        F
      </div>

      <div className='space-y-2'>
        <header className='space-y-1'>
          <p>
            <span className='text-primary-foreground mr-1'>From:</span>
            <span className='text-primary-foreground font-bold'>{`${name} <${email}>`}</span>
          </p>
          <p>
            <span className='text-primary-foreground mr-1'>Subject:</span>{" "}
            <span className='text-primary-foreground font-bold'>{subject}</span>
          </p>
        </header>
        <p className='text-primary-foreground '>{shortDescription}</p>

        <div className='flex items-center'>
          <p className='text-primary-foreground'>{formatDateFromEpoch(date)}</p>
          <button className='bg-none text-highlight font-semibold text-base ml-6'>
            Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailItem;
