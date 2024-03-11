import { useState } from "react";
import "./App.css";
import Searchbar from "./widgets/searchbar";
import PaperTable from "./widgets/papertable";
import Paper from "./model/paper";
import Citation from "./widgets/citation";
import Contribute from "./widgets/contibute";
import FilterSelection from "./widgets/filter-selection";
import Footer from "./widgets/footer";
import ErrorMessage from "./widgets/error-message";
import IntroSection from "./widgets/intro_section";

const dataSetUrl = "https://raw.githubusercontent.com/tuhh-softsec/LLM4SecDev/main/dataset/llms4sec_dataset.json";

type FilterInfo = {
  models: Array<string>;
  tasks: Array<string>;
};

function getFilterInfo(papers: Array<Paper>): FilterInfo {
  const tasks = new Set<string>();
  const models = new Set<string>();
  papers.forEach((e) => {
    e.tasks.forEach((t) => tasks.add(t));
    e.featuredModels.forEach((m) => models.add(m));
  });
  return {
    tasks: Array.from(tasks.values()),
    models: Array.from(models.values()),
  };
}

function filterPapers(
  searchterm: string,
  selectedTasks: Array<string>,
  selectedModels: Array<string>,
  papers: Array<Paper>
): Array<Paper> {
  let searchTerms = searchterm.split(";");
  return papers.filter((p) => {
    let keep = true;
    if (searchTerms.length > 0 && searchTerms[0] !== "") {
      keep &&= filterSearchTerms(searchTerms, p);
    }
    if (selectedTasks.length > 0) {
      keep &&= filterSelctedTasks(selectedTasks, p);
    }
    if (selectedModels.length > 0) {
      keep &&= filterSelctedModel(selectedModels, p);
    }
    return keep;
  });
}

function filterSelctedTasks(selected: Array<string>, paper: Paper): boolean {
  for (let s of selected) {
    if (paper.tasks.includes(s)) {
      return true;
    }
  }
  return false;
}

function filterSelctedModel(selected: Array<string>, paper: Paper): boolean {
  for (let s of selected) {
    if (paper.featuredModels.includes(s)) {
      return true;
    }
  }
  return false;
}

function filterSearchTerms(selected: Array<string>, paper: Paper): boolean {
  for (let e of selected) {
    let eLower = e.toLowerCase();
    let isIncluded =
      paper.title.toLowerCase().includes(eLower) ||
      paper.authors.toLowerCase().includes(eLower);
    if (isIncluded) {
      return true;
    }
  }
  return false;
}

function toggleSelection(currentSelection: Array<string>, selected: string) {
  let idx = currentSelection.indexOf(selected);
  if (idx !== -1) {
    // item in list
    currentSelection.splice(idx, 1);
  } else {
    currentSelection.push(selected);
  }
  return currentSelection;
}


function getPaperData(onSuccess: (value: any) => void, onError: ((value: any) => void)): void {
  fetch(dataSetUrl)
    .then((val) => {
      return val.json();
    })
    .then((jsonData) => {
      onSuccess(jsonData);
    }).catch((reason) => {
      onError(reason);
    });
}


function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(Array<string>());
  const [selectedModels, setSelectedModels] = useState(Array<string>());
  const [paperData, setPaperData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  if (paperData.length === 0) {
    getPaperData((val) => {
      setPaperData(val);
      setErrorMsg("");
    }, (reason) => {
      setErrorMsg("Error retreiving databse.");
    });
  }
  const filterInfo = getFilterInfo(paperData);
  let filteredList = filterPapers(
    searchTerm,
    selectedTasks,
    selectedModels,
    paperData
  );

  let tableView;
  if (errorMsg === "") {
    tableView = <PaperTable paperData={filteredList} />;
  } else {
    tableView = <ErrorMessage text="Error retrieving database." onRetry={() => {
      getPaperData((val) => {
        setPaperData(val);
        setErrorMsg("");
      }, (_) => {
        setErrorMsg("Error retreiving databse.");
      });
    }} />;
  }

  return (
    <div className="App">
      <div className="w-10/12 m-auto">
        <div>
          <h1 className="title has-text-centered text-6xl">
            LLMs4SecDev Database
          </h1>
        </div>
        <IntroSection />
        <Searchbar onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="flex flox-row justify-between">
          <FilterSelection
            headlineText="Select the tasks the LLM needs to perform:"
            selectedOptions={selectedTasks}
            allOptions={filterInfo.tasks}
            onChipClick={(chipText) => {
              let newSelection = toggleSelection(selectedTasks, chipText);
              setSelectedTasks([...newSelection]);
            }}
          />
          <FilterSelection
            headlineText="Select the LLMs that should be included in the study:"
            allOptions={filterInfo.models}
            selectedOptions={selectedModels}
            onChipClick={(val) => {
              let newSelection = toggleSelection(selectedModels, val);
              setSelectedModels([...newSelection]);
            }}
          />
        </div>
        <Contribute />
        {tableView}
        <Citation />
      </div>
      <Footer />
    </div>
  );
}

export default App;
