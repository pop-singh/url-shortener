import axios from "axios";



export const shortenUrl = (longUrl) => {
  return axios.post("http://localhost:8080/shorten", {
    url: longUrl,
  });
};