import React, { useState } from 'react';
import styles from './App.module.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleCloudinaryImageUpload = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'mediaUploading');
    data.append('cloud_name', 'dp4bxldin');

    setIsUploading(true);

    fetch('https://api.cloudinary.com/v1_1/dp4bxldin/image/upload', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.secure_url);
        setIsUploading(false);
      })
      .catch((err) => {
        console.error('Error uploading image:', err);
        setIsUploading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.uploadInput}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button
          onClick={handleCloudinaryImageUpload}
          disabled={!image || isUploading}
          className={styles.uploadButton}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      {isUploading && <p className={styles.loadingText}>Uploading, please wait...</p>}

      {imageUrl && (
        <div className={styles.previewContainer}>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" className={styles.previewImage} />
        </div>
      )}
    </div>
  );
};

export default App;
