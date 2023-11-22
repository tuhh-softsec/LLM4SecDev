import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const cite = `
@misc{LLMs4Sec,
    author = {Torge Hinrichs, Catherine Tony, Emanuele Ianonne},
    title = {LLMs4Sec},
    year = {2023},
    publisher = {Github},
    howpublished = "\\url{https://}"
  }`;



const Citation = () => {

    const copyToClip = () => navigator.clipboard.writeText(cite);

    return (
        <div className="my-4 rounded border-2 p-2 w-full drop-shadow-sm	">
            <details className="text-start">
                <summary className="font-bold">Cite this work</summary>
                <div className="flex justify-between">
                    <div className="inline">Copy the following snippet to cite these results:</div>
                    <button className="inline" onClick={copyToClip}><FontAwesomeIcon icon={faCopy} /></button>
                </div>
                <div className="rounded border-2 drop-shadow-sm p-2">
                    <code className="">
                        {cite}
                    </code>
                </div>
            </details>
        </div>
    );
};


export default Citation;