import React from "react";

export interface PatrimonyItemData {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect: boolean;
}

interface ContextProps {
	ownerId: number;
	setOwnerId: (value: number) => void;
	patrimonies: PatrimonyItemData[];
	setValuesPatrimonies: (value: PatrimonyItemData[]) => void;
}

export const PatrimonyOwnerContext = React.createContext<ContextProps>({
	ownerId: -1,
	setOwnerId: () => {},
	patrimonies: [],
	setValuesPatrimonies: () => {},
});
