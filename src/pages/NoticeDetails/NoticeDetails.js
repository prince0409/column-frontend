import React from "react";

const NoticeDetails = ({ notice }) => {
  return (
    <div className="notice-details">
      <h2>{notice.title}</h2>
      <p>{notice.content}</p>
      <p>{notice.publicationDate}</p>
    </div>
  );
};

export default NoticeDetails;
