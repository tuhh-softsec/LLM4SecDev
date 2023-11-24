import { MouseEventHandler } from "react";

type ErrorMessageProps = {
    text: string;
    onRetry?: MouseEventHandler<HTMLButtonElement>;
};




const ErrorMessage = ({ text, onRetry }: ErrorMessageProps) => {
    return (<div className="border-2 rounded p-2 overflow-auto drop-shadow-sm">
        <div>{text}</div>
        <div className="justify-center">
            <button onClick={onRetry}>Retry</button>
        </div>


    </div>);
};


export default ErrorMessage;