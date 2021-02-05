import * as Types from "pages/Transfer/hooks/types";

export const filterPatrimoniesSelected = (
	patrimonies: Types.PatrimonyData[]
) => {
	const selected = patrimonies.filter(
		(patrimony: Types.PatrimonyData) => patrimony.isSelect === true
	);
	return selected;
};
