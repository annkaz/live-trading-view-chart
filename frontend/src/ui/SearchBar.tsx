import { FiSearch } from "react-icons/fi";

const SearchBar = () => (
  <div className="relative w-full">
    <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-5 w-5" />

    <input
      type="text"
      placeholder="SEARCH"
      className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);

export default SearchBar;
