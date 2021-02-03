import api from "services/api";

interface ApiPatrimoniesData {
	id: number;
	model: string;
	number: string;
	Category: {
		id: number;
		name: string;
	};
}

export const getApiPatrimoniesDataById = async (id: number) => {
	const url = `owners/${id}/patrimonies`;
	const response = await api.get(url);
	return convertToStatePropsData(response.data);
};

const convertToStatePropsData = (datas: ApiPatrimoniesData[]) => {
	const patrimonies = datas.map((data) => {
		return {
			id: data.id,
			model: data.model,
			patrimonyNumber: data.number,
			categoryName: data.Category.name,
			isSelect: false,
		};
	});
	return patrimonies;
};
