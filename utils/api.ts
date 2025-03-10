import axios from "axios";

const API_BASE = "https://json-data-1wm2.onrender.com";

export const fetchBanners = async () => {
  const response = await axios.get(`${API_BASE}/banners`);
  return response.data.banners;
};  

export const fetchDestinations = async () => {
  const response = await axios.get(`${API_BASE}/featured-destination`);
  return response.data.destination;
};
