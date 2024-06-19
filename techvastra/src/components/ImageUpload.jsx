import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import './ImageUpload.css';

const ImageUpload = ({ label, onImageUpload }) => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      className="image-upload"
      border={1}
      borderColor="grey.400"
      borderRadius={8}
      p={2}
      textAlign="center"
      bgcolor="background.paper"
    >
      <input {...getInputProps()} />
      <Typography variant="h6">{label}</Typography>
      <Typography variant="body2">Drag 'n' drop an image here, or click to select one</Typography>
    </Box>
  );
};

export default ImageUpload;
