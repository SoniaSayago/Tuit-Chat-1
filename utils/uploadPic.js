import axios from "axios";

const uploadPic = async (media) => {
  try {
    const form = new FormData();
    form.append("file", media);
    form.append("upload_preset", "profileTuit"); //name of upload preset on cloudinary
    form.append("cloud_name", "tuit-chat");

    const res = await axios.post(process.env.CLOUDINARY_URL, form);
    return res.data.url; //url of uploaded image
  } catch (error) {
    return;
  }
};

export default uploadPic;
