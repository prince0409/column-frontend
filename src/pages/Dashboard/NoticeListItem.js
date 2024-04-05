import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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

NoticeListItem.propTypes = {
  notice: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoticeListItem;
