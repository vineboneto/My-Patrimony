import { PatrimonyData } from "pages/Transfer/hooks/types";
import api from "services/api";

export const transferPatrimoniesSelectedToSecondOwner = async (
	patrimonies: PatrimonyData[],
	secondOwnerId: number
) => {
	for (let patrimony of patrimonies) {
		const url = `patrimonies/${patrimony.id}`;
		await transferPatrimonySelectedToSecondOwner(url, secondOwnerId);
	}
};

const transferPatrimonySelectedToSecondOwner = async (
	url: string,
	secondOwnerId: number
) => {
	await api
		.patch(url, {
			ownerId: secondOwnerId,
		})
		.then(() => {
			alert("Transferido com sucesso");
		});
};
