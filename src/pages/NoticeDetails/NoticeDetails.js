import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchNoticeById } from "../../data/noticeService";

const NoticeDetails = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      // setLoading(true);
      try {
        const noticesData = await fetchNoticeById(id);
        setNotice(noticesData);
      } catch (error) {
        // setError(error.message);
      }
      // setLoading(false);
    };

    fetchNotices();
  }, [id]);
  return (
    <div className="notice-details">
      <h2>Notice Details</h2>
      <h3>{notice.title}</h3>
      <p>{notice.content}</p>
      <p>{notice.publicationDate}</p>
      <Link to={`/`}>Back to Dashboard</Link>
    </div>
  );
};

export default NoticeDetails;
