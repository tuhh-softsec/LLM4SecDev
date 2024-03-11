import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

type ErrorMessageProps = {
  text: string;
  onRetry?: MouseEventHandler<HTMLButtonElement>;
};

const ErrorMessage = ({ text, onRetry }: ErrorMessageProps) => {
  return (
    <div className="border-2 rounded p-2 overflow-auto drop-shadow-sm">
      <div className="text-red-600 font-bold">{text}</div>
      <div className="justify-center">
        <button
          className="p-2 rounded border-2 m-2 drop-shadow-sm hover:bg-slate-100"
          onClick={onRetry}
        >
          <FontAwesomeIcon icon={faRepeat} /> Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
