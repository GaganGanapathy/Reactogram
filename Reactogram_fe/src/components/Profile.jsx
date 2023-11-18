import { useEffect, useState } from "react"
import "../styles/profile.css"
import { Modal } from "react-bootstrap"
import axios from "axios"
import swl2 from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Post from "./Post"

function Profile() {
  useEffect(() => {
    getMyPosts()
  }, [])

  const user = useSelector((state) => state.user.user)

  const navigate = useNavigate()

  const [image, setImage] = useState({ preview: "", data: "" })

  const [caption, setCaption] = useState("")
  const [location, setlocation] = useState("")

  const [allposts, setAllposts] = useState([])

  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  const [showPost, setShowPost] = useState(false)

  const handlePostClose = () => setShowPost(false)
  const handlePostShow = () => setShowPost(true)
  const handleFileSelect = (e) => {
    console.log(e.target.files)
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  const handleImgUpload = async () => {
    let formData = new FormData()
    formData.append("file", image.data)
    const response = axios.post(
      `${import.meta.VITE_API_BASE_URL}/uploadFile`,
      formData
    )
    return response
  }

  const getMyPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.VITE_API_BASE_URL}/myallposts`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      if (response.status == 200) {
        setAllposts(response.data.posts)
      }
    } catch (error) {
      console.log(error)
      swl2.fire({
        icon: "error",
        title: "Could not find Posts",
      })
    }
  }

  const addPost = async () => {
    if (!image.preview || !caption || !location) {
      swl2.fire({
        icon: "error",
        title: "One of the fields is missing",
      })
      return
    }
    const imgRes = await handleImgUpload()

    const request = {
      description: caption,
      location,
      image: `${import.meta.VITE_API_BASE_URL}/files/${imgRes.data.filename}`,
    }
    const postResponse = await axios.post(
      `${import.meta.VITE_API_BASE_URL}/createpost`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    if (postResponse.status == 201) {
      swl2.fire({
        icon: "success",
        title: "Posted Successfully",
      })
      navigate("/posts")
    }
  }

  return (
    <div>
      <div className="container shadow mt-3 p-4">
        <div className="row">
          <div className="col-md-6 d-flex flex-column">
            <img
              className="p-2 img-fluid profile-pic"
              src="https://plus.unsplash.com/premium_photo-1661371927364-e3aec9079c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGphcGFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              alt="profile pic"
            />
            <p className="ms-2 fs-5 fw-bold">{user.fullName}</p>
            <p className="ms-2 fs-5 ">{user.email}</p>
            <p className="ms-2 fs-5 ">
              UI/UX Desginer <a href="#">@Company</a> | Follow{" "}
              <a href="#">@{user.fullName}</a>
            </p>
            <p className="ms-2 fs-5 ">
              My portfolio on <a href="#">www.portfolio.com/{user.fullName}</a>
            </p>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-between mt-3">
            {/* top */}
            <div className="d-flex justify-content-center text-center fw-bold">
              <div className="pe-4">
                <h4>{allposts.length}</h4>
                <p>Posts</p>
              </div>
              <div className="count-section px-4">
                <h4>20</h4>
                <p>Followers</p>
              </div>
              <div className="ps-4">
                <h4>30</h4>
                <p>Following</p>
              </div>
            </div>
            {/* button */}
            <div className="mx-auto mb-3 mt-4 mt-md-0 ">
              <button className="custom-btn custom-btn-white  shadow-sm me-3">
                <span className=" fs-6">Edit Profile</span>
              </button>
              <button
                className="custom-btn custom-btn-white shadow-sm "
                onClick={handlePostShow}
              >
                <span className=" fs-6">Upload Post</span>
              </button>
            </div>
          </div>
        </div>
        {/* thematic break */}
        <div className="row my-3">
          <div className="col-12">
            <hr />
          </div>
        </div>
        {/* Gallery */}
        <div className="row mb-md-4 mb-3 ">
          {allposts.map((post) => {
            return <Post post={post} key={post._id} getMyPosts={getMyPosts} />
          })}
        </div>
      </div>

      <Modal show={showPost} onHide={handlePostClose} size="lg" centered>
        <Modal.Header closeButton>
          <span className="fw-bold fs-5">Upload Image </span>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="upload-box d-flex justify-content-center">
                {image.preview ? (
                  <img src={image.preview} width="360px" height="400px" />
                ) : (
                  <div className="dropZoneContainer align-self-center">
                    <input
                      name="file"
                      type="file"
                      id="drop_zone"
                      className="fileUpload"
                      accept=".jpg,.png,.gif"
                      onChange={handleFileSelect}
                    />
                    <div className="dropZoneOverlay">
                      <i className="fa-solid fa-cloud-arrow-up fa-xl"></i>
                      <br /> Upload Photo from computer
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 d-flex flex-column justify-content-between">
              <div className="row">
                <div className="col-12">
                  <div className="form-floating mb-2">
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="form-control "
                      placeholder="Add Caption"
                      id="caption"
                    ></textarea>
                    <label htmlFor="caption">Add Caption</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <input
                      value={location}
                      onChange={(e) => setlocation(e.target.value)}
                      type="text"
                      placeholder="Add Location"
                      id="location"
                      className="form-control "
                    />
                    <label htmlFor="location">
                      <i className="fa-solid fa-location-dot pe-1"></i>Add
                      Location
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 my-2">
                  <button
                    className="custom-btn-pink float-end"
                    onClick={addPost}
                  >
                    <span className="fs-6 fw-600">Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Profile
