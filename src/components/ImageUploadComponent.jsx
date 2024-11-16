import React, { useState } from "react";
import { Typography, Button, Grid, Paper, MenuItem, Select, FormControl, InputLabel, CircularProgress } from "@mui/material";
import { GradientText } from "../styles/Typography";
import "../styles/Form.css"; // Assuming you have a separate CSS file

const ImageUploadComponent = () => {
  const [image, setImage] = useState(null);
  const [model, setModel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setpredictionResult] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const getApiEndpoint = (model) => {
    // Return the correct API endpoint based on the selected model
    switch (model) {
      case "mnist":
        return "/models/fashion/mnist/predict/";
      case "digit_mnist":
        return "/models/mnist/digit/predict/";
      case "cifar":
        return "/models/cifar/predict/";
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    if (!image || !model) {
      alert("Please select an image and a model.");
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    const endpoint = getApiEndpoint(model);
    const url = "http://localhost:8000"+endpoint;
    console.log(url);
    if (endpoint) {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to get prediction");
        }

        const data = await response.json();
        setpredictionResult(data); // Store the prediction result
        setIsLoading(false);
      } catch (error) {
        alert("Error: " + error.message);
        setIsLoading(false);
      }
    } else {
      alert("Invalid model selected.");
      setIsLoading(false);
    }
  };

  return (
    <section className="image-upload-form">
      <div className="content">
        <GradientText variant="h2">Upload Image & Choose Model</GradientText>
        <Typography variant="body1" paragraph>
          Upload an image and select the machine learning model to perform predictions or classifications. 
          Choose from our available models and let Visionify do the rest.
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="form-card glass">
              <Typography variant="h6">Choose Model</Typography>
              <FormControl fullWidth>
                <InputLabel>Model</InputLabel>
                <Select
  value={model}
  onChange={handleModelChange}
  label="Model"
  sx={{
    '& .MuiSelect-select': {
      color: 'white', // Text color of the selected value
    },
    '& .MuiMenuItem-root': {
      color: 'white', // Text color of the dropdown items
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
    '& .MuiFormLabel-root': {
      color: 'white', // Label color when focused
    }
  }}
>
  <MenuItem value="mnist">MNIST (Fashion)</MenuItem>
  <MenuItem value="digit_mnist">Digit MNIST (Modified MNIST)</MenuItem>
  <MenuItem value="cifar">CIFAR-10 (Image Classification)</MenuItem>
</Select>

              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper className="form-card glass">
              <Typography variant="h6">Upload Image</Typography>
              <Button variant="contained" component="label" fullWidth>
                Select Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              {image && (
                <Typography variant="body2" mt={2}>
                  {image.name}
                </Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className="form-card glass">
              <Button
                variant="contained"
                onClick={handleSubmit}
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Paper>
          </Grid>

          {predictionResult && (
            <Grid item xs={12}>
              <Paper className="form-card glass">
                <Typography variant="h6">Prediction Result</Typography>
                <Typography variant="body1">
                  Predicted Class: {predictionResult.data.predicted_class}
                </Typography>
                <Typography variant="h6" mt={2}>Confidence Scores:</Typography>
                <div className="confidence-scores">
                  {Object.entries(predictionResult.data.confidence_scores).map(
                    ([label, score]) => (
                      <Typography
                        variant="body2"
                        key={label}
                      >
                        Class {label}: {score.toFixed(6)}%
                      </Typography>
                    )
                  )}
                </div>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    </section>
  );
};

export default ImageUploadComponent;
