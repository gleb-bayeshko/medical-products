export default {
  MONGODB_URL:
    process.env.MONGODB_URL || "mongodb://localhost/medical_products",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
