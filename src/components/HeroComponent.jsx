import React from "react";
import { GradientText } from "../styles/Typography";
import { Typography } from "@mui/material";

const HeroComponent = () => {
    return (
        <section className="hero">
          <div className="content">
            <GradientText variant="h1">Visionify</GradientText>
            <Typography variant="body1">
              Unlock the power of AI with Visionify — your intelligent image classification platform. 
              Choose from a variety of models to analyze and interpret images, from disease detection to object recognition. 
              Seamlessly upload your images, and let Visionify provide insightful predictions with cutting-edge machine learning.
            </Typography>
            <div className="field">
              <div className="mouse"></div>
            </div>
          </div>
        </section>
    )
}

export default HeroComponent;