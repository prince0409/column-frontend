import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import NoticeList from "./NoticeList";
import NewNoticeForm from "../../components/NewNoticeForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import debounce from "../../hooks/debounce";
import { fetchAllNotices } from "../../data/noticeService";
import usePagination from "../../hooks/usePagination";
import useFetchData from "../../hooks/useFetchData";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState();
  const [publicationDate, setPublicationDate] = useState();

  const {
    currentPage,
    handleNextPage,
    handlePrevPage,
    initializePagination,
    direction,
    lastDocRef,
    firstDocRef,
  } = usePagination();

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    initializePagination();
  }, 500);

  const handlePublicationDateChange = (event) => {
    const date = event.target.value;
    setPublicationDate(date);
    initializePagination();
  };

  const {
    data: { data: notices, ...refs },
    loading,
    error,
  } = useFetchData(
    () =>
      fetchAllNotices({
        searchQuery,
        publicationDate,
        lastDoc: lastDocRef.current,
        firstDoc: firstDocRef.current,
        direction,
      }),
    [currentPage, searchQuery, publicationDate]
  );

  useEffect(() => {
    lastDocRef.current = refs.lastDoc;
    firstDocRef.current = refs.firstDoc;
  }, [refs]);

  return (
    <div className="App">
      <h1>Notice Dashboard</h1>
      <NewNoticeForm />
      <SearchBar handleSearch={handleSearch} />
      <input
        type="date"
        value={publicationDate}
        onChange={handlePublicationDateChange}
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      <NoticeList
        notices={notices}
        handlePrevPage={handlePrevPage}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default Dashboard;
