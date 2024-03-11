import { ReactNode } from "react";
import Paper from "../model/paper";
import TableRow from "./table-row";

const colums = [
  "Title",
  "Authors",
  "Year",
  "Aritfacts",
  "Tasks",
  "Featured LLMs",
];
const colums_widths: any = {
  0: "w-96",
  1: "w-44",
  2: "w-14",
};
type PaperTableProps = {
  paperData: Array<Paper>;
};

const PaperTable = ({ paperData }: PaperTableProps) => {
  let tableData = [];
  let tableHeads: Array<ReactNode> = [];
  for (let p of paperData) {
    tableData.push(<TableRow paper={p} />);
  }

  colums.forEach((val, i) => {
    let colWidth = "";
    if (colums_widths[i] !== undefined) {
      colWidth = " " + (colums_widths[i] as string);
    }
    tableHeads.push(<td className={"font-bold" + colWidth}>{val}</td>);
  });

  return (
    <div className="border-2 rounded p-2 overflow-auto drop-shadow-sm max-h-[90%]">
      <table className="table-fixed w-full border-spacing-y-0">
        <thead>
          <tr>{tableHeads}</tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default PaperTable;
