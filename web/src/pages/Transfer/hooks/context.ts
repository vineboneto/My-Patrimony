import React from "react";

export interface PatrimoniesItemData {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect: boolean;
}

interface ContextProps {
	ownerId: number;
	setOwnerId: (value: number) => void;
	patrimonies: PatrimoniesItemData[];
	setValuesPatrimonies: (value: PatrimoniesItemData[]) => void;
}

export const PatrimonyOwnerContext = React.createContext<ContextProps>({
	ownerId: -1,
	setOwnerId: () => {},
	patrimonies: [],
	setValuesPatrimonies: () => {},
});
