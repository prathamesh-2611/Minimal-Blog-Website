import Post from "../Post";
import { useEffect, useState } from "react";
import PopupRegisterPage from "./PopupRegisterPage";
import { useNavigate } from "react-router-dom";


export default function IndexPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }
}, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-message">
              You need to register to post a blog.
            </h2>

            <PopupRegisterPage />
            <div className="button-row">
              <button
                className="close-button"
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
              >
                Already Register
              </button>
              <button
                className="close-button"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
