import React from "react";

export interface PatrimonyState {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect: boolean;
}

export interface OwnerState {
	ownerId: number;
	error: string;
}

export const defaultValueOwnerState = {
	ownerId: -1,
	error: "",
};

interface ContextProps {
	ownerState: OwnerState;
	setOwnerState: (value: OwnerState) => void;
	patrimonies: PatrimonyState[];
	setValuesPatrimonies: (value: PatrimonyState[]) => void;
}

export const PatrimonyOwnerContext = React.createContext<ContextProps>({
	ownerState: defaultValueOwnerState,
	setOwnerState: () => {},
	patrimonies: [],
	setValuesPatrimonies: () => {},
});
