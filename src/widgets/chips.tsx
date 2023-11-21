type ChipProps = {
    text: string,
}



const Chip = ({ text }: ChipProps) => {
    return (
        <div className="inline rounded border-2 bg-slate-200 p-1 text-sm" >
            {text}
        </div>
    );
};


export default Chip;