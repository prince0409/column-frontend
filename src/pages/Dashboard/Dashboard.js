import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import NoticeList from "./NoticeList";
import NewNoticeForm from "../../components/NewNoticeForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import debounce from "../../hooks/debounce";
import { fetchAllNotices, fetchNoticesCount } from "../../data/noticeService";
import usePagination from "../../hooks/usePagination";
import useFetchData from "../../hooks/useFetchData";

const PER_PAGE = 2;

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState();
  const [publicationDate, setPublicationDate] = useState("");

  const {
    currentPage,
    handleNextPage,
    handlePrevPage,
    initializePagination,
    direction,
    lastDocRef,
    firstDocRef,
    perPage,
  } = usePagination(PER_PAGE);

  const handleQueryChange = debounce((query) => {
    setSearchQuery(query);
    initializePagination();
  }, 500);

  const handlePublicationDateChange = (date) => {
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
        perPage,
      }),
    [currentPage, searchQuery, publicationDate, direction]
  );

  const {
    data: { count: noticesCount },
  } = useFetchData(
    () =>
      fetchNoticesCount({
        searchQuery,
        publicationDate,
      }),
    [searchQuery, publicationDate]
  );

  useEffect(() => {
    lastDocRef.current = refs.lastDoc;
    firstDocRef.current = refs.firstDoc;
  }, [refs, lastDocRef, firstDocRef]);

  return (
    <div className="notice-dashboard">
      <h1>Notice Dashboard</h1>
      <NewNoticeForm />
      <SearchBar
        query={searchQuery}
        handleQueryChange={handleQueryChange}
        publicationDate={publicationDate}
        handlePublicationDateChange={handlePublicationDateChange}
      />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <NoticeList
          notices={notices}
          handlePrevPage={handlePrevPage}
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          maxPage={Math.round(noticesCount / perPage)}
        />
      )}
    </div>
  );
}

export default Dashboard;
