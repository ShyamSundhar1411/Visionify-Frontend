import React from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { GradientText } from "../styles/Typography";
import "../styles/capabilitystyles.css"; // Assuming you have a separate CSS file

const CapabilitiesSection = () => {
  return (
    <section className="capabilities">
      <div className="content">
        <GradientText variant="h2">Our Capabilities</GradientText>
        <Typography variant="body1" paragraph>
          Visionify leverages cutting-edge AI and machine learning technology to offer robust and accurate image analysis. 
          Here’s a look at the capabilities that make Visionify your go-to platform for intelligent image classification:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="capability-card glass">
              <Typography variant="h6">Multiple Model Options</Typography>
              <Typography variant="body2">
                Choose from a variety of models designed to suit different image analysis needs, from disease detection to object recognition.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="capability-card glass">
              <Typography variant="h6">Fast & Accurate Predictions</Typography>
              <Typography variant="body2">
                Get quick and reliable predictions with our optimized models. Visionify ensures high performance with every analysis.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="capability-card glass">
              <Typography variant="h6">User-Friendly Interface</Typography>
              <Typography variant="body2">
                Seamlessly upload images and view results with an intuitive and easy-to-use interface, designed for both beginners and experts.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
