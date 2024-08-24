"use client";
import { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import axiosInstance from "../utils/axios";
import Comments from "./Comments";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/utils/datetime";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

export default function Post({ post, fullPost }) {
  const postId = post?._id;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const { setDeleteModal, setPosts, setCurrentPost, setSelectedUser } =
    useAppContext();
  const menuRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?._id;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      const { data: updatedPost } = await axiosInstance.put(
        `/posts/${postId}/like`
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
      setCurrentPost(updatedPost);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleView = async () => {
    setCurrentPost(post);
    router.push(`/posts/${postId}`);
    setIsMenuOpen(false);
  };

  const handleEdit = async () => {
    setCurrentPost(post);
    router.push(`/posts/${postId}/edit`);
    setIsMenuOpen(false);
  };

  const handleDelete = async () => {
    setCurrentPost(post);
    setDeleteModal(true);
    setIsMenuOpen(false);
  };

  const getComments = async () => {
    setCurrentPost(post);
    if (showComments) {
      setShowComments(false);
      return;
    }
    try {
      if (post.comments.length > 0) {
        const { data } = await axiosInstance.get(`/posts/${postId}/comments`);
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setShowComments(true);
    }
  };

  useEffect(() => {
    if (fullPost) getComments();
  }, []);

  const userHasLiked = post?.likes.includes(userId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-dark-200 p-4 rounded-lg shadow-md flex flex-col justify-between w-full transition-all ease-in-out">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <img
              src={`/avatars/${post?.createdBy?.avatar ?? "default"}.png`}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-purple-500"
            />
            <h3
              className="text-lg font-semibold text-purple-500 -mt-1 cursor-pointer"
              onClick={() => {
                setSelectedUser(post?.createdBy);
                router.push("/profile");
              }}
            >
              {post?.createdBy.name}
            </h3>
          </div>
          <p className="py-1 rounded-md text-sm min-w-fit text-gray-400">
            {timeAgo(new Date(post?.createdAt))}
          </p>
        </div>
        <hr className="border-gray-600 my-2" />
        <h3 className="text-xl font-semibold mb-1">{post?.title}</h3>
        <p className="text-gray-300 whitespace-pre-wrap">
          {fullPost
            ? post?.content
            : `${post?.content.substr(0, 250)}${
                post?.content.length > 250 ? "..." : ""
              }`}
          {!fullPost && post?.content.length > 250 && (
            <button onClick={handleView} className="text-purple-500 ml-1">
              View more
            </button>
          )}
        </p>
        <hr className="border-gray-600 my-2" />
        <div className="flex justify-between">
          <div className="flex space-x-5">
            <div
              className="flex flex-row items-center space-x-1 cursor-pointer transition-all ease-in-out hover:scale-105"
              onClick={handleLike}
            >
              {userHasLiked ? (
                <AiFillHeart className="text-2xl text-rose-500" />
              ) : (
                <AiOutlineHeart className="text-2xl text-rose-500" />
              )}
              <p className="text-lg">{post?.likes.length}</p>
            </div>
            <div
              className="flex flex-row items-center space-x-1 cursor-pointer transition-all ease-in-out hover:scale-105"
              onClick={getComments}
            >
              <AiOutlineComment className="text-2xl text-gray-300" />
              <p className="text-lg">{post?.comments.length}</p>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            {((fullPost && post?.createdBy._id == userId) || !fullPost) && (
              <div className="cursor-pointer p-1" onClick={toggleMenu}>
                <IoEllipsisVerticalSharp className="text-xl text-gray-300" />
              </div>
            )}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg w-32 border-gray-600 border overflow-hidden text-gray-300">
                {!fullPost && (
                  <button
                    onClick={handleView}
                    className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                  >
                    View Full Post
                  </button>
                )}
                {post?.createdBy._id == userId && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                    >
                      Edit Post
                    </button>
                    <button
                      onClick={handleDelete}
                      className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                    >
                      Delete Post
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <Comments
          showComments={showComments}
          setComments={setComments}
          setPosts={setPosts}
          setCurrentPost={setCurrentPost}
          comments={comments}
          postId={post?._id}
          handleView={handleView}
          fullPost={fullPost}
        />
      </div>
    </div>
  );
}
