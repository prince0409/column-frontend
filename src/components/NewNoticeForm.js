import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase/db"; // Import Firebase Firestore connection

const NewNoticeForm = () => {
  const [noticeData, setNoticeData] = useState({
    title: "",
    content: "",
    publicationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "notices"), noticeData);
      console.log("Document written with ID: ", docRef.id);
      // Clear the form after adding the notice
      setNoticeData({
        title: "",
        content: "",
        publicationDate: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="notice-form">
      <input
        type="text"
        name="title"
        value={noticeData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={noticeData.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <input
        type="date"
        name="publicationDate"
        value={noticeData.publicationDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Notice</button>
    </form>
  );
};

export default NewNoticeForm;
