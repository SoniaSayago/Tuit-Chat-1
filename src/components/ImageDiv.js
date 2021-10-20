import React from "react";
import styled from "styled-components";
import { PlusCircleIcon } from "@heroicons/react/solid";

function ImageDiv({
  mediaPreview,
  inputRef,
  handleChange,
  profilePicUrl,
}) {
  return (
    <>
      <ImageInput
        type="file"
        accept="image/*"
        onChange={handleChange}
        name="media"
        ref={inputRef}
      ></ImageInput>
      {mediaPreview === null ||
      profilePicUrl === null ||
      profilePicUrl === "" ? (
        <>
          <ImageContainer
            style={{ position: "relative" }}
            onClick={() => inputRef.current.click()}
          >
            <PlusCircleIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                bottom: "-.6rem",
                color: "#7c3aed",
                fontSize: "0.5rem",
                left: "2rem",
              }}
            />
          </ImageContainer>{" "}
        </>
      ) : (
        <>
          <ImageContainer
            style={{ position: "relative" }}
            onClick={() => inputRef.current.click()}
          >
            <Image src={mediaPreview} alt="image preview" />
            <PlusCircleIcon
              style={{
                cursor: "pointer",
                position: "absolute",
                bottom: "-.6rem",
                color: "#7c3aed",
                fontSize: "0.5rem",
                left: "2rem",
              }}
            />
          </ImageContainer>
        </>
      )}
    </>
  );
}

export default ImageDiv;

const ImageContainer = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  ${'' /* background: rgb(113, 47, 173); */}
  background-size: 100%;
  background-image: url(https://res.cloudinary.com/tuit-chat/image/upload/v1634213249/Tuit/user_iizj8t.png);
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  object-fit: cover;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
`;
