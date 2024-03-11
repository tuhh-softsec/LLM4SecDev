import { MouseEventHandler } from "react";

type ChipProps = {
  text: string;
  active: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Chip = ({ text, active, onClick }: ChipProps) => {
  let bgColor = active ? "bg-green-200 hover:bg-green-400" : "hover:bg-slate-200 ";
  return (
    <div className={"inline rounded p-2 text-sm border-2 " + bgColor}>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

export default Chip;
