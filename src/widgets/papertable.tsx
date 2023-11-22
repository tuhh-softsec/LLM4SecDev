import Paper from "../model/paper";
import TableRow from "./table-row";

const colums = ["Title", "Authors", "Year", "Aritfacts", "Tasks", "Featured LLMs"];

type PaperTableProps = {
  paperData: Array<Paper>;
};

const PaperTable = ({ paperData }: PaperTableProps) => {
  let tableData = [];
  let tableHeads = [];
  for (let p of paperData) {
    tableData.push(<TableRow paper={p}/>);
  }
  for (let c of colums) {
    tableHeads.push(<td className="font-bold">{c}</td>);
  }

  return (
  <div className="border-2 rounded p-2 overflow-auto drop-shadow-sm max-h-[90%]">
      <table className="table-auto w-full border-spacing-y-0">
        <thead>
          <tr>{tableHeads}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default PaperTable;
