import { cleanEnv, str, port, url } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
      PORT:         port(),
      FRONTEND_URL: url(),
      MONGO_URI:    str(),
      JWT_SECRET:   str({ minLength: 16 }),
      NODE_ENV:     str({ choices: ["development", "production", "test"] }),
      CLOUDINARY_CLOUD_NAME:  str(),
      CLOUDINARY_API_KEY:     str(),
      CLOUDINARY_API_SECRET:  str(),
  });
};

export default validateEnv;