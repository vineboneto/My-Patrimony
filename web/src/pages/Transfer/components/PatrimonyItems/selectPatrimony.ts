import { PatrimonyData } from "pages/Transfer/hooks/types";

export const changeStateOfSelectedPatrimonies = (
	id: number,
	patrimonies: PatrimonyData[]
) => {
	const newPatrimonies = patrimonies.map((patrimony) => {
		if (patrimoniesEquals(patrimony.id, id)) {
			patrimony.isSelect = !patrimony.isSelect;
			return patrimony;
		}
		return patrimony;
	});
	return newPatrimonies;
};

const patrimoniesEquals = (a: number, b: number) => {
	if (a === b) return true;
	return false;
};
