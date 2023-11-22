const contributeUrl = "https://github.com/";

const Contribute = () => {
  return (
    <div className="flex justify-end w-full mb-4">
      <div className="inline-block">
        <a href={contributeUrl} className="p-2 rounded border-2 hover:bg-slate-200">Add publication</a>
      </div>
    </div>
  );
};


export default Contribute;