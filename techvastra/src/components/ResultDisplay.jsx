import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import './ResultDisplay.css';

const ResultDisplay = ({ originalImage, resultImage }) => {
  return (
    <Box className="result-display">
      <Typography variant="h5" gutterBottom>
        Preview
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Original Dress Image</Typography>
          <img src={originalImage} alt="Dress" className="preview-image" />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Dress with Fabric Overlay</Typography>
          <img src={resultImage} alt="Result" className="preview-image" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultDisplay;
