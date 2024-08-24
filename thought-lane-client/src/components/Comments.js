import { useState } from "react";
import axiosInstance from "../utils/axios";
import { timeAgo } from "@/utils/datetime";

export default function Comments({
  showComments,
  comments,
  postId,
  setComments,
  setPosts,
  setCurrentPost,
  handleView,
  fullPost,
}) {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewComment(value);
  };

  const handleNewComment = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data: postedComment } = await axiosInstance.post(
        `/posts/${postId}/comments`,
        {
          comment: newComment,
        }
      );
      setComments((prevComments) => [postedComment, ...prevComments]);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: [...post.comments, postedComment],
              }
            : post
        )
      );
      setCurrentPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, postedComment],
      }));
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setNewComment("");
    }
  };

  const displayedComments = fullPost ? comments : comments.slice(0, 3);

  return (
    showComments && (
      <>
        <div className="flex flex-col justify-start my-2">
          <p className="font-bold">Comments</p>
        </div>
        {error && (
          <p className="bg-red-500 text-white mb-4 rounded-md p-2 text-sm">
            Error: {error}
          </p>
        )}
        <form
          onSubmit={handleNewComment}
          className="flex flex-row space-x-3 items-start my-3"
        >
          <textarea
            name="newComment"
            value={newComment}
            onChange={handleChange}
            placeholder="Type here..."
            className="block w-full bg-dark-300 rounded-md shadow-sm p-1.5"
            rows="1"
            required
          />
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-md min-w-fit text-sm font-medium"
          >
            Add comment
          </button>
        </form>
        <div className="flex flex-col space-y-4 items-center w-full md:items-start transition-all ease-in-out">
          {comments.length > 0 ? (
            displayedComments.map((comment) => (
              <div key={comment._id} className="w-full">
                <div className="flex w-full space-x-2">
                  <img
                    src={`/avatars/${comment?.user?.avatar ?? "default"}.png`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-purple-500 mt-1"
                  />
                  <div className="w-full">
                    <div className="flex justify-between w-full">
                      <p className="text-purple-500">{comment.user.name}</p>
                      <p className="text-sm text-gray-400 min-w-fit">
                        {timeAgo(new Date(comment.createdAt))}
                      </p>
                    </div>
                    <p className="text-sm text-gray-400 whitespace-pre-wrap">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No comments.</p>
          )}
          {comments.length > 3 && !fullPost && (
            <button onClick={handleView} className="text-purple-500 mt-1">
              View more
            </button>
          )}
        </div>
      </>
    )
  );
}
