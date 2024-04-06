import React from "react";

const SearchBar = ({
  handleQueryChange,
  handlePublicationDateChange,
  publicationDate,
  query,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => handleQueryChange(e.target.value)}
        className="search-bar"
        value={query}
      />
      <input
        type="date"
        value={publicationDate}
        onChange={(e) => handlePublicationDateChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
