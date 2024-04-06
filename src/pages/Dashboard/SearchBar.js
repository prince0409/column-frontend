import React from "react";

const SearchBar = ({
  handleQueryChange,
  handlePublicationDateChange,
  publicationDate,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => handleQueryChange(e.target.value)}
        className="search-bar"
      />
      <input
        type="date"
        value={publicationDate}
        onChange={handlePublicationDateChange}
      />
    </div>
  );
};

export default SearchBar;
