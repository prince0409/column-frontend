import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import NoticeList from "./NoticeList";
import NewNoticeForm from "../../components/NewNoticeForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import debounce from "../../hooks/debounce";
import { fetchAllNotices } from "../../data/noticeService";

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [publicationDate, setPublicationDate] = useState();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const noticesData = await fetchAllNotices({
          searchQuery,
          publicationDate,
        });
        setNotices(noticesData);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchNotices();
  }, [searchQuery, publicationDate]);

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const handlePublicationDateChange = (event) => {
    const date = event.target.value;
    setPublicationDate(date);
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
      <NoticeList notices={notices} />
    </div>
  );
}

export default App;
