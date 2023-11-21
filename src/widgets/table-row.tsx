import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TableRowProps = {
  title: string;
  authors: string;
  year: string;
  linkToPaper: string;
  tasks: Array<string>;
};

const displayNumAuthors = 3;

function shortenAuthors(authors: string): string {
  let authorList = authors.split(" and ");
  let retStr = "";
  for (let i = 0; i < Math.min(authorList.length, displayNumAuthors); i++) {
    retStr += authorList[i] + ", ";
  }
  if (retStr.length > displayNumAuthors) {
    retStr += "et al.";
  }
  return retStr;
}

const TableRow = ({
  title,
  authors,
  year,
  linkToPaper,
  tasks,
}: TableRowProps) => {
  return (
    <tr>
      <td className="text-left">{title}</td>
      <td className="text-left">{shortenAuthors(authors)}</td>
      <td className="text-left">{year}</td>
      <td>
        <a href={linkToPaper}>
          <FontAwesomeIcon icon={faLink} />
        </a>
      </td>
      <td className="text-left">{tasks.join(", ")}</td>
    </tr>
  );
};

export default TableRow;
