const env = {
  port: process.env.PORT || 8000,
  origin: process.env.ORIGIN,
  dbURI: process.env.DB_URI,
  nodeEnv: process.env.NODE_ENV,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
};

export default env;
