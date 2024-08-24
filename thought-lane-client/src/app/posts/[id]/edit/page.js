"use client";

import NewPost from "@/components/NewPost";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../utils/axios";
import { useEffect, useState } from "react";
import LoadingScreen from "@/app/loading";

export default function EditPost({ params }) {
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
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0 items-center md:items-start md:justify-center">
      <NewPost editPost={currentPost} />
    </div>
  );
}
