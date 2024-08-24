"use client";
import { useState } from "react";
import axiosInstance from "../utils/axios";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function NewPost({ editPost }) {
  const [formData, setFormData] = useState({
    title: editPost ? editPost?.title : "",
    content: editPost ? editPost?.content : "",
  });
  const [error, setError] = useState("");
  const { setPosts } = useAppContext();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (editPost) {
      try {
        const { data: editedPost } = await axiosInstance.put(
          `/posts/${editPost?._id}`,
          formData
        );
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === editedPost._id ? { ...post, ...editedPost } : post
          )
        );
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        router.push(`/posts/${editPost?._id}`);
      }
    } else {
      try {
        const { data: newPost } = await axiosInstance.post("/posts", formData);
        setPosts((prevPosts) => [newPost, ...prevPosts]);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setFormData({ title: "", content: "" });
      }
    }
  };

  return (
    <div className="bg-dark-200 p-4 rounded-lg shadow-lg w-full sm:w-4/5 md:w-1/3 xl:w-1/4 transition-all ease-in-out">
      <h1 className="text-2xl font-medium text-center">
        {editPost ? "Edit post" : "New post"}
      </h1>
      <hr className="border-gray-600 my-4" />
      {error && (
        <p className="bg-red-500 text-white mb-4 rounded-md p-2 text-sm">
          Error: {error}
        </p>
      )}
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full bg-dark-300 rounded-md shadow-sm p-1.5"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full bg-dark-300 rounded-md shadow-sm p-1.5"
            rows={editPost ? "8" : "2"}
            required
          />
        </div>

        <div className="mt-3 text-center">
          <button
            type="submit"
            className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md w-full text-md font-medium"
          >
            {editPost ? "Update post" : "Add post"}
          </button>
        </div>
      </form>
    </div>
  );
}
