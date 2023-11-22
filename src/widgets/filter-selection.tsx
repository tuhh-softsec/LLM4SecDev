import { ReactElement } from "react";
import Chip from "./chip";

type FilterSelectionProps = {
  headlineText: string,
  selectedOptions: Array<string>;
  allOptions: Array<string>;
  onChipClick: (chipText: string) => any;
};

const FilterSelection = ({
  headlineText,
  selectedOptions,
  allOptions,
  onChipClick
}: FilterSelectionProps) => {
  let taskChips: Array<ReactElement> = [];
  allOptions.forEach((val) => {
    taskChips.push(
      <Chip
        text={val}
        active={selectedOptions.includes(val)}
        onClick={() => onChipClick(val)}
      />
    );
  });

  return (
    <div className="rounded border-slate-200 border-2 p-2 mb-4 basis-[49.5%]">
      <div className="text-left my-2">
        {headlineText}
      </div>
      <div className="flex flex-wrap">{taskChips}</div>
    </div>
  );
};

export default FilterSelection;
