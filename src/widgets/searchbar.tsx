import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ChangeEventHandler } from "react";


type SearchbarProps = {
    onChange : ChangeEventHandler<HTMLInputElement>,
};

const Searchbar = ({onChange}: SearchbarProps) => {
  return (
    <div className="my-4 rounded border-2 flex p-2 drop-shadow-sm">
      <div className="inline-block flex-none mr-2">
        <FontAwesomeIcon icon={faSearch} />
      </div>{" "}
      <div className="inline-block grow">
        <input
          className="w-full p-1"
          placeholder="Search for a title, or author (separate multiple queries with ';')"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Searchbar;
