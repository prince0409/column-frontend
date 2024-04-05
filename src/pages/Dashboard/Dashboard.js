import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import NoticeList from "./NoticeList";
import NewNoticeForm from "../../components/NewNoticeForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import debounce from "../../hooks/debounce";
import { fetchAllNotices } from "../../data/noticeService";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState();
  const [publicationDate, setPublicationDate] = useState();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("");
  const lastDocRef = useRef();
  const firstDocRef = useRef();

  useEffect(() => {
    const fetchNoticesData = async () => {
      setLoading(true);
      try {
        const fetchedNotices = await fetchAllNotices({
          searchQuery,
          publicationDate,
          lastDoc: lastDocRef.current,
          firstDoc: firstDocRef.current,
          direction,
        });
        setNotices(fetchedNotices.data);
        lastDocRef.current = fetchedNotices.lastDoc;
        firstDocRef.current = fetchedNotices.firstDoc;
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchNoticesData();
  }, [currentPage, searchQuery, publicationDate]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setDirection("next");
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setDirection("prev");
  };

  const initializePagination = () => {
    firstDocRef.current = null;
    lastDocRef.current = null;
    setDirection("");
    setCurrentPage(1);
  };
  const handleSearch = debounce((query) => {
    setSearchQuery(query);
    initializePagination();
  }, 500);

  const handlePublicationDateChange = (event) => {
    const date = event.target.value;
    setPublicationDate(date);
    initializePagination();
  };

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
