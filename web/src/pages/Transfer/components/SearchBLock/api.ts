import api from "services/api";

export const getApiPatrimoniesDataById = async (id: number) => {
	const url = `owners/${id}/patrimonies`;
	const response = await api.get(url);
	return response.data;
};
