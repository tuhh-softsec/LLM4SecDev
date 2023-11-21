import React, { useState } from "react";
import "./App.css";
import Searchbar from "./widgets/searchbar";
import PaperTable from "./widgets/papertable";
import TaskSelector from "./widgets/task-selection";
import paperData from "./dataset/llms4sec_dataset.json";
import Paper from "./model/paper";

function getAllTasks(papers: Array<Paper>): Array<string> {
  const tasks = new Set<string>();
  papers.forEach((e) => {
    e.tasks.forEach((t) => tasks.add(t));
  });
  return Array.from(tasks.values());
}

function filterPaperListBySearchterm(searchterm: string, papers: Array<Paper>) {
  if (searchterm === "") {
    return papers;
  }
  return papers.filter((val) =>
    val.title.toLowerCase().includes(searchterm.toLowerCase())
  );
}

function filterPaperListByTasks(
  selectedTasks: Array<string>,
  papers: Array<Paper>
) {
  if (selectedTasks.length === 0) {
    return papers;
  }
  return papers.filter((p) => {
    for (let s of selectedTasks) {
      if (p.tasks.includes(s)) {
        return true;
      }
    }
    return false;
  });
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
  const allTasks = getAllTasks(paperData);
  let filteredBySearchTerm = filterPaperListBySearchterm(searchTerm, paperData);
  let filteredByTasks = filterPaperListByTasks(
    selectedTasks,
    filteredBySearchTerm
  );
  return (
    <div className="App">
      <div>
        <div className="title has-text-centered text-xl">
          LLM4SEC (Name in progress)
        </div>
      </div>
      <div className="w-9/12 m-auto">
        <Searchbar onChange={(e) => setSearchTerm(e.target.value)} />
        <TaskSelector
          selectedTasks={selectedTasks}
          allTasks={allTasks}
          onChipClick={(chipText) => {
            let newSelection = toggleSelection(selectedTasks, chipText);
            setSelectedTasks([...newSelection]);
          }}
        />
        <PaperTable paperData={filteredByTasks} />
      </div>
    </div>
  );
}

export default App;
