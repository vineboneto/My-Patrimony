import React from "react";

export interface PatrimoniesItemData {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect: boolean;
}

interface ContextProps {
	patrimonies: PatrimoniesItemData[];
	setValuesPatrimonies: (value: PatrimoniesItemData[]) => void;
}

export const PatrimonyOwnerContext = React.createContext<ContextProps>({
	patrimonies: [],
	setValuesPatrimonies: () => {},
});
