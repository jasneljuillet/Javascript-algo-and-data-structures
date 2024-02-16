const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://hagn-elearning.vercel.app/"
    : "http://localhost:3000";

export default baseUrl;
