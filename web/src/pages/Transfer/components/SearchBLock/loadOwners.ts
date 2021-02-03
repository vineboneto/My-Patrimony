import api from "services/api";

interface ApiData {
	id: number;
	name: string;
}

export const getApiOwnerData = async () => {
	const response = await api.get("owners");
	return convertToOptionsValues(response.data);
};

const convertToOptionsValues = (datas: ApiData[]) => {
	const options = datas.map((data) => {
		return {
			value: data.id.toString(),
			label: data.name,
		};
	});
	return options;
};
