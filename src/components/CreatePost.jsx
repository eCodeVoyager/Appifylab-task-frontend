import { useState } from "react";
import { usePost } from "../context/PostContext";
import { useUser } from "../context/UserContext";

function CreatePost() {
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const { createPost } = usePost();
  const { user } = useUser();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Please enter some content");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("privacy", privacy);
      
      files.forEach((file) => {
        formData.append("files", file);
      });

      await createPost(formData);
      
      setSuccess("Post created successfully!");
      setContent("");
      setFiles([]);
      setPrivacy("public");
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="_feed_inner_text_area  _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError("")}></button>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
          </div>
        )}

        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image">
            <img src="assets/images/txt_img.png" alt="Image" className="_txt_img" />
          </div>
          <div className="form-floating _feed_inner_text_area_box_form ">
            <textarea 
              className="form-control _textarea" 
              placeholder="Write something..." 
              id="floatingTextarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            ></textarea>
            <label className="_feed_textarea_label" htmlFor="floatingTextarea">
              Write something for {user?.firstName || "User"}...
            </label>
          </div>
        </div>

        <div className="_feed_inner_text_area_bottom">
          <div className="_feed_inner_text_area_item">
            <div className="_feed_inner_text_area_bottom_photo _feed_common">
              <label className="_feed_inner_text_area_bottom_photo_link" style={{ cursor: "pointer", margin: 0 }}>
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  multiple 
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  disabled={loading}
                />
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path fill="#666" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z"/>
                  </svg>
                </span>
                Photo {files.length > 0 && `(${files.length})`}
              </label>
            </div>

            <div className="_feed_inner_text_area_bottom_video _feed_common">
              <button 
                type="button"
                className="_feed_inner_text_area_bottom_photo_link"
                onClick={() => setPrivacy(privacy === "public" ? "private" : "public")}
                disabled={loading}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
              >
                <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path fill="#666" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1-13h-2v6h2V5zm0 8h-2v2h2v-2z"/>
                  </svg>
                </span>
                {privacy === "public" ? "Public" : "Private"}
              </button>
            </div>
          </div>

          <div className="_feed_inner_text_area_btn">
            <button 
              type="button" 
              className="_feed_inner_text_area_btn_link"
              onClick={handleSubmit}
              disabled={loading || !content.trim()}
            >
              <svg className="_mar_img" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
                <path fill="#fff" fillRule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z" clipRule="evenodd" />
              </svg> 
              <span>{loading ? "Posting..." : "Post"}</span> 
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;

