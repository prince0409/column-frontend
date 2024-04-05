import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../services/firebase/db";

export const fetchNoticeById = async (id) => {
  try {
    const docRef = doc(db, "notices", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
    } else {
      throw new Error("Notice not found");
    }
  } catch (error) {
    console.error("Error fetching notice:", error);
    throw error;
  }
};

export const fetchAllNotices = async ({ searchQuery, publicationDate }) => {
  try {
    let noticesRef = collection(db, "notices");
    if (searchQuery) {
      noticesRef = query(noticesRef, where("title", "==", searchQuery));
    }
    if (publicationDate) {
      noticesRef = query(
        noticesRef,
        where("publicationDate", "==", publicationDate)
      );
    }
    noticesRef = query(noticesRef, orderBy("publicationDate", "desc"));
    const noticesSnapshot = await getDocs(noticesRef);
    return noticesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
};
