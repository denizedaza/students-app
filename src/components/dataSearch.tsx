import { FC } from "react";
import './dataSearch.css'

interface DataSearchProps {
  handleSearch: (text: string) => void;
  type?: string;
}

const DataSearch: FC<DataSearchProps> = ({ handleSearch, type }) => {
  return (
    <>
      <input
        className="search-bar"
        placeholder={`Search by ${type}`}
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </>
  );
};

export default DataSearch;
