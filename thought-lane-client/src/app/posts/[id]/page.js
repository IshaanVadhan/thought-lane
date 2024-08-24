"use client";

import Post from "@/components/Post";
import axiosInstance from "../../../utils/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/app/loading";
import { useAppContext } from "@/context/AppContext";
import DeleteModal from "@/components/DeleteModal";

export default function SinglePost({ params }) {
  const { id } = params;
  const [loadingPost, setLoadingPost] = useState(true);
  const { currentPost, setCurrentPost, deleteModal, setDeleteModal } =
    useAppContext();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/posts/${id}`);
        setCurrentPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        router.push("/posts");
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, []);

  return loadingPost ? (
    <LoadingScreen />
  ) : (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0 items-center md:items-start md:justify-center">
        <div className="flex flex-col space-y-4 items-center w-full sm:w-4/5 md:w-1/2 xl:w-2/5 justify-center md:items-start transition-all ease-in-out">
          <Post post={currentPost} fullPost={true} />
        </div>
      </div>
      <DeleteModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} />
    </>
  );
}
