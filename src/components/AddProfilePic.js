import React, { useRef, useState } from "react";
import ImageDiv from "./ImageDiv";

function AddProfilePic({onChangeMedia}) {
  const inputRef = useRef();
  // const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === "media") {
      onChangeMedia(files[0]); //files that we receive from e.target is automatically an array, so we don't need Array.from
      setMediaPreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
        <ImageDiv
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMedia={onChangeMedia}
          inputRef={inputRef}
          handleChange={handleChange}
        ></ImageDiv>
        <div
          style={{
            maxWidth: "37rem",
            display: "flex",

            flexWrap: "wrap",
            justifyContent: "center",
            columnGap: "2rem",
          }}
        >
        </div>
    </>
  );
}


export default AddProfilePic;