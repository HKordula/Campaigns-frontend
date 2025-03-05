import axios from "axios";

const API_URL = "https://campaigns-backend.onrender.com/api/campaigns";
const KEYWORDS_API_URL = "https://campaigns-backend.onrender.com/api/keywords";

export const listCampaigns = async () => axios.get(API_URL);

export const addCampaign = async (campaign) => axios.post(API_URL, campaign);

export const getCampaign = async (id) => axios.get(`${API_URL}/${id}`);

export const updateCampaign = async (id, campaign) => axios.put(`${API_URL}/${id}`, campaign);

export const deleteCampaign = async (id) => axios.delete(`${API_URL}/${id}`);

export const getPredefinedKeywords = async () => axios.get(KEYWORDS_API_URL);
