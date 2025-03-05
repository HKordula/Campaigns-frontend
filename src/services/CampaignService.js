import axios from "axios";

const API_URL = "https://campaigns-backend.onrender.com/api/campaigns";
const USERS_API_URL = "https://campaigns-backend.onrender.com/api/users";

export const listCampaigns = async () => axios.get(API_URL);

export const addCampaign = async (userId, campaign) => axios.post(`${API_URL}/${userId}`, campaign);

export const getCampaign = async (id) => axios.get(`${API_URL}/${id}`);

export const updateCampaign = async (id, campaign) => axios.put(`${API_URL}/${id}`, campaign);

export const deleteCampaign = async (id) => axios.delete(`${API_URL}/${id}`);

export const getPredefinedKeywords = async () => axios.get("https://campaigns-backend.onrender.com/api/keywords");

export const getUserBalance = async (userId) => axios.get(`${USERS_API_URL}/${userId}/balance`);
