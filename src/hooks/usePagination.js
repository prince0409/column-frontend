import { useState, useRef } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState("");
  const lastDocRef = useRef(null);
  const firstDocRef = useRef(null);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setDirection("next");
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setDirection("prev");
  };

  const initializePagination = () => {
    firstDocRef.current = null;
    lastDocRef.current = null;
    setDirection("");
    setCurrentPage(1);
  };

  return {
    currentPage,
    handleNextPage,
    handlePrevPage,
    direction,
    lastDocRef,
    firstDocRef,
    initializePagination,
  };
};

export default usePagination;
