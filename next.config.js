module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com" ],
  },
  env: {
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/tuit-chat/image/upload",
  }, //url for image upload to cloudinary. First copy "API base url" from Cloudinary. Then paste it here.
}
