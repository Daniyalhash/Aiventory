import '@/styles/SignupPage.css';
import { useState, useEffect } from 'react';
import Loader from '@/components/Loader'; // Import your Loader component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from '@fortawesome/free-solid-svg-icons';

const DatasetUpload = ({ userId, onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    console.log("User ID in DatasetUpload:", userId);
  }, [userId]);

const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);
    setUploadError(null);
    setFile(file); // Corrected this line

    // Mocking file upload process
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadSuccess(true); // Optional: Indicate success after mock upload
        }
    }, 300);
};
  const clearMessage = () => {
    setTimeout(() => {
      setUploadError(null);
      setUploadSuccess(false);
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!file) {
      setUploadError('Please upload a file.');
      // clearMessage();
      return;
    }
    if (file.type !== "text/csv") {
      setUploadError("Please upload a valid CSV file.");
      return;
  }
  
    setIsUploading(true);
    // setUploadProgress(0);
    console.log("Proceeding with file submission...");

    const formData = new FormData();
    formData.append('dataset', file);
    formData.append("user_id", userId);

    try {
      const response = await fetch("http://127.0.0.1:8000/aiventory/upload_dataset/", {
        method: "POST",
        body: formData,
        headers: {
          // Include any necessary headers here
        },
      });

    

      const data = await response.json();
      if (response.ok) {
        setUploadSuccess(true);
        clearMessage();
        onUploadComplete({ user_id: data.user_id });
      } else {
        setUploadError(data.error || "Upload failed.");
        clearMessage();
      }
    } catch (error) {
      console.error("Error during dataset upload:", error);
      setUploadError("Something went wrong. Please try again.");
      clearMessage();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="stepContainer">
      <div className="loginText">

        <h1 className="welcometext">Create your account</h1>
        <p className="subtext">Upload your store data</p>

      </div>
      <div className="label">
      <label htmlFor="fileUpload" className="customFileButton">
        Choose File
        <FontAwesomeIcon icon={faUpload} className="arrow-icon" />
      </label>
      </div>
     
      <input
        type="file"
        id="fileUpload"
        onChange={handleFileUpload}
        className="hiddenFileInput"
      />

    {/* {isUploading && (
                <div className="progressContainer">
                    <div
                        className="progressBar"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                    <p className="progressText">{uploadProgress}%</p>
                </div>
            )} */}
           
                <div className="progressContainer">
                    <div
                        className="progressBar"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                    <p className="progressText">{uploadProgress}%</p>
                </div>
            

<button
                onClick={handleSubmit}
                className="iconButton"
                disabled={isUploading || !file}
            >
                {isUploading ? "Uploading..." : "Submit CSV"}
            </button>

      {uploadError && <p className="error-text">{uploadError}</p>}
      {uploadSuccess && <p className="success-text">Dataset uploaded successfully!</p>}
    </div>
  );
};

export default DatasetUpload;
