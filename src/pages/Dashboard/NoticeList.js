import React from "react";
import NoticeListItem from "./NoticeListItem";

const NoticeList = ({
  notices,
  handlePrevPage,
  currentPage,
  handleNextPage,
  maxPage,
}) => {
  return (
    <div className="notice-list">
      {notices?.map((notice) => (
        <NoticeListItem key={notice.id} notice={notice} />
      ))}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage <= 1}>
          Prev Page
        </button>
        <span className="current-page">{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage >= maxPage}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default NoticeList;
