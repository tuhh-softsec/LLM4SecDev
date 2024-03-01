import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const contributeUrl =
  "https://github.com/tuhh-softsec/LLM4SecDev/issues/new?assignees=gOATiful&labels=Paper&projects=&template=add-new-publication.yml&title=%5BPaper+Contribution%5D%3A+";

const Contribute = () => {
  return (
    <div className="flex justify-end w-full mb-4">
      <div className="inline-block">
        <a
          href={contributeUrl}
          className="p-2 rounded border-2 hover:bg-slate-200"
        >
          <FontAwesomeIcon icon={faPlus} /> Add publication
        </a>
      </div>
    </div>
  );
};

export default Contribute;
