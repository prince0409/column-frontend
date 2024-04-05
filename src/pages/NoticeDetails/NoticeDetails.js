import React from "react";
import { useParams, Link } from "react-router-dom";
import { fetchNoticeById } from "../../data/noticeService";
import useFetchData from "../../hooks/useFetchData";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const NoticeDetails = () => {
  const { id } = useParams();
  const {
    data: notice,
    loading,
    error,
  } = useFetchData(() => fetchNoticeById(id), [id]);

  return (
    <div className="notice-details">
      <h2>Notice Details</h2>
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && notice && (
        <>
          <h3>{notice.title}</h3>
          <p>{notice.content}</p>
          <p>{notice.publicationDate}</p>
        </>
      )}
      <Link to={`/`}>Back to Dashboard</Link>
    </div>
  );
};

export default NoticeDetails;
