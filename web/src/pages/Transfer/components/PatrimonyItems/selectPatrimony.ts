import { PatrimonyState } from "pages/Transfer/hooks/context";

export const changeStateOfSelectedPatrimonies = (
	id: number,
	patrimonies: PatrimonyState[]
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
