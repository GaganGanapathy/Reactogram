import { useEffect, useState } from "react"
import Card from "./Card"
import axios from "axios"
import Swal2 from "sweetalert2"

function PostOverview() {
  const [allposts, setAllposts] = useState([])
  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.VITE_API_BASE_URL}/allposts`
      )
      setAllposts(response.data.posts)
    } catch (error) {
      Swal2.fire({
        icon: "error",
        title: "Something went wrong",
      })
    }
  }

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${import.meta.VITE_API_BASE_URL}/deletepost/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      console.log(response)
      getAllPosts()
    } catch (error) {
      Swal2.fire({
        icon: "error",
        title: "Something went wrong",
      })
    }
  }

  useEffect(() => {
    getAllPosts()
  }, [])
  return (
    <div className="container mt-md-5 mt-3">
      <div className="row">
        {allposts.map((post) => {
          return (
            <div className="col-md-4 mb-2">
              <Card
                key={post._id}
                post={post}
                deletePost={deletePost}
                getAllPosts={getAllPosts}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostOverview
