import { ReactElement } from "react";
import Chip from "./chip";

type TaskSelectorProps = {
  selectedTasks: Array<string>;
  allTasks: Array<string>;
  onChipClick: (chipText: string) => any;
};

const TaskSelector = ({
  selectedTasks,
  allTasks,
  onChipClick,
}: TaskSelectorProps) => {
  let taskChips: Array<ReactElement> = [];
  allTasks.forEach((val) => {
    taskChips.push(
      <Chip
        text={val}
        active={selectedTasks.includes(val)}
        onClick={() => onChipClick(val)}
      />
    );
  });

  return (
    <div className="rounded border-slate-200 border-2 p-2 mb-4">
      <div className="text-left my-2">
        Select the tasks the LLM needs to perform:
      </div>
      <div className="flex flex-wrap">{taskChips}</div>
    </div>
  );
};

export default TaskSelector;
