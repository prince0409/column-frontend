import React from "react";

const NoticeListItem = ({ notice }) => {
  return (
    <div className="notice-list-item">
      <h3>{notice.title}</h3>
      <p>{notice.content}</p>
      <p>{notice.publicationDate}</p>
    </div>
  );
};

export default NoticeListItem;
