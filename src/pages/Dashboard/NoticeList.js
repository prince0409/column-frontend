import React from "react";
import NoticeListItem from "./NoticeListItem";

const NoticeList = ({ notices }) => {
  return (
    <div className="notice-list">
      {notices.map((notice) => (
        <NoticeListItem key={notice.id} notice={notice} />
      ))}
    </div>
  );
};

export default NoticeList;
