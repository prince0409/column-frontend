import {
  collection,
  query,
  where,
  orderBy,
  startAfter,
  getDocs,
  doc,
  getDoc,
  endBefore,
  limit,
  getCountFromServer,
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

export const fetchAllNotices = async ({
  searchQuery,
  publicationDate,
  lastDoc,
  firstDoc,
  direction,
}) => {
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
    noticesRef = query(
      noticesRef,
      orderBy("publicationDate", "desc"),
      limit(2)
    );
    if (firstDoc && direction === "prev") {
      noticesRef = query(noticesRef, endBefore(firstDoc));
    }
    if (lastDoc && direction === "next") {
      noticesRef = query(noticesRef, startAfter(lastDoc));
    }

    const noticesSnapshot = await getDocs(noticesRef);
    const noticesData =
      noticesSnapshot?.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) || [];

    return {
      data: noticesData,
      lastDoc: noticesSnapshot.docs[noticesSnapshot.docs.length - 1],
      firstDoc: noticesSnapshot.docs[0],
    };
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
};

export const fetchNoticesCount = async ({ searchQuery, publicationDate }) => {
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
    const countSnapshot = await getCountFromServer(noticesRef);

    return countSnapshot.data();
  } catch (error) {
    console.error("Error fetching notices count:", error);
    throw error;
  }
};
