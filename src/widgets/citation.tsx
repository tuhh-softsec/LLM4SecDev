import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const cite = `
@misc{LLMs4Sec,
    author = {Torge Hinrichs, Catherine Tony, Emanuele Iannone},
    title = {LLMs4Sec},
    year = {2023},
    publisher = {Github},
    howpublished = "\\url{https://tuhh-softsec.github.io/LLM4Sec/}"
  }`;



const Citation = () => {

    const copyToClip = () => navigator.clipboard.writeText(cite);

    return (
        <div className="my-4 rounded border-2  w-full drop-shadow-sm	">
            <details className="text-start">
                <summary className="font-bold hover:bg-slate-100 p-2">Cite this website</summary>
                <div className="flex justify-between m-2">
                    <div className="inline">Copy the following snippet to cite these results:</div>
                </div>
                <div className="rounded border-2 drop-shadow-sm p-2 m-2">
                    <button className="absolute top-2 right-2" onClick={copyToClip}><FontAwesomeIcon icon={faCopy} /></button>
                    <code className="">
                        {cite}
                    </code>
                </div>
            </details>
        </div>
    );
};


export default Citation;