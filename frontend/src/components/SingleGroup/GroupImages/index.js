import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const GroupImages = ({ props }) => {
  const groupImages = props.groupImages;

  const mainStyle = {
    paddingBottom: "3rem",
    width: "40rem",
  };

  const imageStyle = {
    width: "12rem",
    height: "12rem",
    objectFit: "cover",
    marginTop: "1rem",
    marginRight: "1rem",
    borderRadius: "1rem",
  };

  let images = (
    <div style={mainStyle}>
      {groupImages.map((image) => (
        <img src={image.url} style={imageStyle}></img>
      ))}
    </div>
  );
  return <>{images}</>;
};

export default GroupImages;
