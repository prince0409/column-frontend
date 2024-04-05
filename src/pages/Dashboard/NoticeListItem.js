import React from "react";
import { Link } from "react-router-dom";

const NoticeListItem = ({ notice }) => {
  return (
    <div className="notice-list-item">
      <h3>{notice.title}</h3>
      <p>{notice.content}</p>
      <p>{notice.publicationDate}</p>
      <Link to={`/notices/${notice.id}`}>View Details</Link>
    </div>
  );
};

export default NoticeListItem;
