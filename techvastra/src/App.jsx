import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import ResultDisplay from './components/ResultDisplay';
import { Container, Button, Typography, Grid } from '@mui/material';
import './App.css';

const App = () => {
  const [dressImage, setDressImage] = useState(null);
  const [fabricImage, setFabricImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);

  const handleDressUpload = (file) => {
    setDressImage(file);
  };

  const handleFabricUpload = (file) => {
    setFabricImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('dressImage', dressImage);
    formData.append('fabricImage', fabricImage);

    try {
      const response = await fetch('http://localhost:5000/apply-fabric', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResultImage(`data:image/jpeg;base64,${result.resultImage}`);
    } catch (error) {
      console.error('Error applying fabric:', error);
    }
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Dress Fabric Overlay
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ImageUpload label="Upload Dress Image" onImageUpload={handleDressUpload} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ImageUpload label="Upload Fabric Image" onImageUpload={handleFabricUpload} />
        </Grid>
      </Grid>
      <Button
        className="button"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!dressImage || !fabricImage}
      >
        Apply Fabric
      </Button>
      {resultImage && <ResultDisplay originalImage={URL.createObjectURL(dressImage)} resultImage={resultImage} />}
    </Container>
  );
};

export default App;