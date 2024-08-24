"use client";

import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import LoadingScreen from "../loading";
import Post from "@/components/Post";
import DeleteModal from "@/components/DeleteModal";
import axiosInstance from "@/utils/axios";

export default function Profile() {
  const { userPosts, setUserPosts, deleteModal, setDeleteModal, selectedUser } =
    useAppContext();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await axiosInstance.get(
          `/user/${selectedUser?._id}/posts`
        );
        setUserPosts(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          setUserPosts([]);
        } else {
          console.error("Error fetching posts:", error);
        }
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [selectedUser]);

  return loadingPosts ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 items-center md:items-start md:justify-center">
        <div className="bg-dark-200 p-4 rounded-lg shadow-lg w-full sm:w-4/5 md:w-1/3 xl:w-1/4 transition-all ease-in-out flex flex-col justify-center items-center space-y-2">
          <img
            src={`/avatars/${selectedUser?.avatar ?? "default"}.png`}
            alt="Profile"
            className="w-28 h-28 rounded-full border border-purple-500"
          />
          <h1 className="text-2xl font-medium text-center text-purple-500">
            {selectedUser?.name}
          </h1>
          <hr className="border-gray-600 my-3 w-full" />
          <p className="text-gray-300 text-center">{selectedUser?.bio}</p>
        </div>
        <div className="overflow-y-auto md:max-h-[75dvh] md:pr-4 flex flex-col space-y-4 items-center w-full sm:w-4/5 md:w-1/2 xl:w-2/5 md:items-start transition-all ease-in-out">
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <Post key={post._id} post={post} userId={user?._id} />
            ))
          ) : (
            <p className="text-gray-400">No posts available.</p>
          )}
        </div>
      </div>
      <DeleteModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} />
    </>
  );
}
