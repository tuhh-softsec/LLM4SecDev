import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paper from "../model/paper";
import { ReactNode } from "react";
import {
  faGithub,
  faGitlab,
  faResearchgate,
} from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type TableRowProps = {
  paper: Paper;
};

const displayNumAuthors = 1;
let iconMapping = new Map<string, IconDefinition>([
  ["github", faGithub],
  ["gitlab", faGitlab],
  ["researchgate", faResearchgate],
]);

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

function createAritfactIcons(artifacts: Array<string>): Array<ReactNode> {
  let artifactIcons: Array<ReactNode> = [];
  artifacts.forEach((url) => {
    let icon: IconDefinition = faFile;
    iconMapping.forEach((val, key) => {
      if (url.includes(key)) {
        icon = val;
      }
    });
    let aTag = (
      <a className="mr-1" href={url}>
        <FontAwesomeIcon icon={icon} />
      </a>
    );
    artifactIcons.push(aTag);
  });
  return artifactIcons;
}

const TableRow = ({ paper }: TableRowProps) => {
  return (
    <tr className="text-sm border-y hover:bg-slate-100">
      <td className="text-left">{paper.title}</td>
      <td className="">{shortenAuthors(paper.authors)}</td>
      <td className="">{paper.year}</td>
      <td>{createAritfactIcons(paper.artifactUrls)}</td>
      <td className="">{paper.tasks.join(", ")}</td>
      <td className="">{paper.featuredModels.join(", ")}</td>
    </tr>
  );
};

export default TableRow;
