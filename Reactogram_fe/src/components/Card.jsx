import "../styles/card.css"
import moreAction from "../assets/more-action.png"
import { useSelector } from "react-redux"
import axios from "axios"
import { useState } from "react"
import "dotenv/config"
import Swal2 from "sweetalert2"

function Card({ post, deletePost, getAllPosts }) {
  const [liked, setLiked] = useState(false)

  const [commentBox, setCommentBox] = useState(false)
  const [comment, setComment] = useState("")

  const render = useSelector((state) => state.user.user)

  const like = async (postId) => {
    const response = await axios.put(
      `${process.env.API_BASE_URL}/like`,
      {
        postId,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    if (response.status === 200) {
      getAllPosts()
      setLiked(true)
    }
  }

  const submitComment = async (postId) => {
    try {
      const response = await axios.put(
        `${process.env.API_BASE_URL}/comment`,
        {
          postId,
          commentText: comment,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      if (response.status === 200) {
        getAllPosts()
        setComment("")
        setCommentBox(false)
      }
    } catch (error) {
      console.log(error)
      Swal2.fire({
        icon: "error",
        title: "Something went wrong! Please try again",
      })
    }
  }

  const unlike = async (postId) => {
    const response = await axios.put(
      `${process.env.API_BASE_URL}/unlike`,
      {
        postId,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    if (response.status === 200) {
      getAllPosts()
      setLiked(false)
    }
  }
  return (
    <div>
      <div className="card shadow-sm">
        <div className="card-body px-2">
          <div className="row">
            <div className="col-8 d-flex">
              <img
                className="p-2 profile-pic"
                src="https://images.unsplash.com/photo-1692432825053-db5c844fa91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fEJuLURqcmNCcndvfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
                alt="post"
              />
              <div className="mt-2">
                <p className="fs-6 fw-bold">{post.author.fullName}</p>
                <p className="location">{post.description}</p>
              </div>
            </div>
            {post.author._id == render._id ? (
              <div className="col-4">
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => deletePost(post._id)}
                  src={moreAction}
                  alt="more action"
                  className="float-end fs-3 p-2 mt-2"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <img
                style={{ borderRadius: "15px" }}
                className="p-2 img-fluid"
                src={post.image}
                alt="post"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-6 d-flex  ps-2">
              <i
                onClick={async (e) =>
                  !liked ? await like(post._id) : await unlike(post._id)
                }
                className={
                  !liked
                    ? "px-2 fa-solid fa-thumbs-up"
                    : "px-2 fa-solid fa-thumbs-down"
                }
              ></i>
              <i
                onClick={() => setCommentBox(true)}
                className=" pe-2 fa-regular fa-comment"
              ></i>
              <i className=" fa-solid fa-location-arrow"></i>
            </div>
            {commentBox && (
              <div className="row">
                <div className="col-8">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-warning"
                    onClick={() => submitComment(post._id)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {post.comments.map((comment) => {
              return (
                <div className="row">
                  <div className="col-12">
                    <p className="mt-1 mb-0">
                      {comment.commentText} - {comment.commentedBy.fullName}
                    </p>
                  </div>
                </div>
              )
            })}
            <div className="col-6">
              <span className="pe-2 fs-6 fw-bold float-end">
                {post.likes.length} likes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
