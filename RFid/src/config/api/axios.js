import axios from "axios";

export default axios.create({
  // baseURL: "https://kollege-api.onrender.com",
  baseURL: "http://localhost:3500",
  // "http://localhost:3500",

  headers: { "Content-Type": "application/json" },
});
