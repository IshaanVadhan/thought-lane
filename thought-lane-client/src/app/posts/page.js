"use client";

import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import Post from "../../components/Post";
import LoadingScreen from "../loading";
import { useAuth } from "@/context/AuthContext";
import NewPost from "@/components/NewPost";
import DeleteModal from "@/components/DeleteModal";
import { useAppContext } from "@/context/AppContext";

export default function PostsPage() {
  const { posts, setPosts, deleteModal, setDeleteModal } = useAppContext();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await axiosInstance.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  return loadingPosts ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 items-center md:items-start md:justify-center">
        <NewPost />
        <div className="overflow-y-auto md:max-h-[75dvh] md:pr-4 flex flex-col space-y-4 items-center w-full sm:w-4/5 md:w-1/2 xl:w-2/5 md:items-start transition-all ease-in-out">
          {posts.length > 0 ? (
            posts.map((post) => (
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
