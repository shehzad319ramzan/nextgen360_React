// src/components/common/Loader/Loader.jsx
import React from "react";
import loaderAnimation from "../../../assets/loader.gif";

function Loader({ size = "sm", fullscreen = true, pixelSize }) {
    const wrapperStyle = fullscreen
        ? "flex items-center justify-center w-full h-screen bg-white"
        : "flex items-center justify-center";

    const sizeClasses = {
        sm: "w-3 h-3",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    return (
        <div className={wrapperStyle}>
            <img
                src={loaderAnimation}
                alt='Loading...'
                style={pixelSize ? { width: pixelSize, height: pixelSize } : {}}
                className={`${sizeClasses[size]} object-cover`}
            />
        </div>
    );
}

export default Loader;
