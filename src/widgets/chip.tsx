import { MouseEventHandler } from "react";

type ChipProps = {
  text: string;
  active: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Chip = ({ text, active, onClick }: ChipProps) => {
  let bgColor = active ? "bg-green-400" : "bg-slate-100";
  return (
    <div className={"inline rounded border-2 p-1 text-sm mr-2 " + bgColor}>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

export default Chip;
