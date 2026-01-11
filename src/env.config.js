const env = {
  port: process.env.PORT || 8000,
  origin: process.env.ORIGIN,
  dbURI: process.env.DB_URI,
  nodeEnv: process.env.NODE_ENV,
};

export default env;
