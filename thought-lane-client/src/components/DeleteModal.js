"use client";
import axiosInstance from "../utils/axios";
import { useAppContext } from "@/context/AppContext";

export default function DeleteModal({ isOpen }) {
  if (!isOpen) return null;
  const { setDeleteModal, currentPost, setPosts, setCurrentPost } =
    useAppContext();

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${currentPost?._id}`);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== currentPost?._id)
      );
      setCurrentPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleteModal(false);
    }
  };

  const onClose = () => setDeleteModal(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div
        className="fixed inset-0 bg-black opacity-60"
        onClick={onClose}
      ></div>
      <div className="relative bg-dark-200 rounded-lg shadow-lg p-6 max-w-xs sm:max-w-sm mx-auto">
        <h2 className="text-xl font-semibold text-purple-500">
          Confirm Delete
        </h2>
        <hr className="border-gray-600 my-3" />
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-dark-300 text-white py-2 px-3 hover:bg-gray-700 rounded-md min-w-fit text-sm font-medium transition-all ease-in-out"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-3 hover:bg-red-700 rounded-md min-w-fit text-sm font-medium transition-all ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
