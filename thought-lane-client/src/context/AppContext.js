"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!currentPost) router.push("/posts");
  }, [currentPost]);

  return (
    <AppContext.Provider
      value={{
        posts,
        setPosts,
        currentPost,
        setCurrentPost,
        deleteModal,
        setDeleteModal,
        userPosts,
        setUserPosts,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
