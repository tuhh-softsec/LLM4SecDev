import React, { useState } from "react";
import "./App.css";
import Searchbar from "./widgets/searchbar";
import PaperTable from "./widgets/papertable";
import Paper from "./model/paper";
import Citation from "./widgets/citation";
import Contribute from "./widgets/contibute";
import FilterSelection from "./widgets/filter-selection";
import Footer from "./widgets/footer";

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

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTasks, setSelectedTasks] = useState(Array<string>());
  const [selectedModels, setSelectedModels] = useState(Array<string>());
  const [paperData, setPaperData] = useState([]);

  if (paperData.length === 0) {
    fetch(process.env.PUBLIC_URL + "dataset/llms4sec_dataset.json")
      .then((val) => {
        return val.json();
      })
      .then((jsonData) => setPaperData(jsonData));
  }

  const filterInfo = getFilterInfo(paperData);
  let filteredList = filterPapers(
    searchTerm,
    selectedTasks,
    selectedModels,
    paperData
  );
  return (
    <div className="App">
      <div>
        <div className="title has-text-centered text-xl">
          LLM4SEC (Name in progress)
        </div>
      </div>
      <div className="w-10/12 m-auto">
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
        <PaperTable paperData={filteredList} />
        <Citation />
      </div>
      <Footer />
    </div>
  );
}

export default App;
