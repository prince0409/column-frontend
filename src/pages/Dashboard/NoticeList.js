import React from "react";
import NoticeListItem from "./NoticeListItem";

const NoticeList = ({
  notices,
  handlePrevPage,
  currentPage,
  handleNextPage,
}) => {
  return (
    <div className="notice-list">
      {notices?.map((notice) => (
        <NoticeListItem key={notice.id} notice={notice} />
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default NoticeList;
