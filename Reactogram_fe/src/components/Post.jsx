import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import horizontalMoreAction from "../assets/horizontalMoreAction.png"
import Swal2 from "sweetalert2"
import axios from "axios"

function Post({ post, getMyPosts }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const deletePost = async (postId) => {
    try {
      setShow(false)
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/deletepost/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      getMyPosts()
    } catch (error) {
      Swal2.fire({
        icon: "error",
        title: "Something went wrong",
      })
    }
  }

  return (
    <>
      <div className="col-4" key={post._id}>
        <div className="card" onClick={handleShow}>
          <img src={post.image} className="card-img-top" alt="post" />
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            {/* left section */}
            <div className="col-md-6">
              <div>
                <div id="carouselExampleIndicators" className="carousel slide">
                  {/* <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="2"
                      aria-label="Slide 3"
                    ></button>
                  </div> */}
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={post.image}
                        className="d-block w-100"
                        alt={post.description}
                      />
                    </div>
                  </div>
                  {/* <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button> */}
                </div>
              </div>
            </div>
            {/* right section  */}
            <div className="col-md-6">
              <div className="row">
                <div className="col-6 d-flex">
                  <img
                    className="p-2 profile-pic"
                    src="https://images.unsplash.com/photo-1692432825053-db5c844fa91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fEJuLURqcmNCcndvfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=400&q=60"
                    alt="post"
                  />
                  <div className="mt-2">
                    <p className="fs-6 fw-bold">{post.description}</p>
                    <p className="location">{post.location}</p>
                  </div>
                </div>
                <div className="col-6 d-flex justify-content-end">
                  <div className="dropdown ms-5">
                    <a type="button" data-bs-toggle="dropdown">
                      <img src={horizontalMoreAction} alt="more action" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="fa-regular fa-pen-to-square px-2"></i>
                          Edit Post
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={() => deletePost(post._id)}
                        >
                          <i
                            className="fa-solid fa-trash px-2"
                            style={{ color: "#000205" }}
                          ></i>
                          Delete Post
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <span className="p-2 text-muted fs-6">2 hours ago</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="p-2">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vel beatae consectetur obcaecati voluptatem ducimus
                    cupiditate?
                  </p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-6 d-flex  ps-2">
                  <i className=" px-2 fa-solid fa-thumbs-up"></i>
                  <i className=" pe-2 fa-regular fa-comment"></i>
                  <i className=" fa-solid fa-location-arrow"></i>
                </div>
                <div className="col-12">
                  <span className="ps-1 fs-6 fw-bold ">
                    {post.likes.length} likes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Post
