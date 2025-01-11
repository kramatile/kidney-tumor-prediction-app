import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from "../styles/dropZone.module.css";

const DropZone = ({ className }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [prediction,setPrediction] = useState("");

  const cleanupPreview = useCallback((fileToCleanup) => {
    if (fileToCleanup?.preview) {
      URL.revokeObjectURL(fileToCleanup.preview);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles?.length > 0) {
      const errorMessage = rejectedFiles[0].errors[0].message;
      setError(errorMessage);
      return;
    }

    if (acceptedFiles?.length) {
      cleanupPreview(file);
      const newFile = acceptedFiles[0];
      setFile(
        Object.assign(newFile, { preview: URL.createObjectURL( newFile) })
      );
      setError(null);
    }
  }, [file, cleanupPreview]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000, // Max size: 1MB
    onDrop,
  });

  const removeFile = useCallback(() => {
    cleanupPreview(file);
    setFile(null);
  }, [file, cleanupPreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);
      console.log([...formData]);
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setPrediction(data.prediction)
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => cleanupPreview(file);
  }, [file, cleanupPreview]);

  return (
    <>
      {prediction ? (
        <div className={styles.resultContainer}>
          <h2 className={styles.resultTitle}>Prediction Result</h2>
          {file && file.preview && (
            <img src={file.preview} alt="Uploaded file preview" className={styles.imageResult} />
          )}
          <p className={styles.resultText}>Prediction: {prediction}</p>
          <button onClick={() => {setPrediction(null);removeFile();}} className={styles.uploadButton}>
            Back to Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`${styles.dropzoneForm} ${className || ''}`}>
          <div
            {...getRootProps({
              className: `${styles.dropzoneContainer} ${isDragActive ? styles.active : ''}`,
            })}
          >
            <input {...getInputProps()} />
            <div className={styles.dropzoneContent}>
              <span className={styles.dropzoneIcon}>
                <img src="cloud-up-arrow-svgrepo-com.svg" alt="image cloud" />
              </span>
              {isDragActive ? (
                <p className={styles.dropzoneText}>Drop the image here...</p>
              ) : (
                <div>
                  <p className={styles.dropzoneText}>Drag & drop an image here, or click to select</p>
                  <p className={styles.dropzoneTextSub}>
                    Accepted formats: JPG/JPEG, PNG, GIF, WebP (max 1MB)
                  </p>
                </div>
              )}
            </div>
          </div>
  
          {error && <p className={styles.errorMessage}>{error}</p>}
  
          {file && file.preview && (
            <section className={styles.previewContainer}>
              <div className={styles.previewHeader}>
                <h2 className={styles.previewTitle}>Preview</h2>
                <button
                  type="button"
                  onClick={removeFile}
                  className={styles.removeButton}
                >
                  Remove file
                </button>
              </div>
              <div>
                <img src={file.preview} alt={file.name} className={styles.imagePreview} />
                <p className={styles.previewName}>{file.name}</p>
              </div>
              <button
                type="submit"
                disabled={isUploading}
                className={styles.uploadButton}
              >
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </section>
          )}
        </form>
      )}
    </>
  );   
};

export default DropZone;
