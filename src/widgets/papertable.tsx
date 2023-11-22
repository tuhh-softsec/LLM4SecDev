import Paper from "../model/paper";
import TableRow from "./table-row";

const colums = ["Title", "Authors", "Year", "Paper", "Tasks"];

type PaperTableProps = {
  paperData: Array<Paper>;
};

const PaperTable = ({ paperData }: PaperTableProps) => {
  let tableData = [];
  let tableHeads = [];
  for (let e of paperData) {
    tableData.push(TableRow(e));
  }
  for (let c of colums) {
    tableHeads.push(<td className="font-bold text-left">{c}</td>);
  }

  return (
    <div className="border-2 rounded p-2 max-h-96 h-96 overflow-auto drop-shadow-sm">
      <table className="table-auto w-full border-spacing-y-1">
        <thead>
          <tr>{tableHeads}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default PaperTable;
