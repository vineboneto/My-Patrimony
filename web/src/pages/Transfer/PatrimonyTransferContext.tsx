import { createContext } from "react";
import { Context } from "vm";

export interface StateProps {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect: boolean;
}

interface ContextProps {
	patrimonies: StateProps[];
	setValuesPatrimonies: (values: StateProps[]) => void;
}

export const PatrimonyOwnerContext = createContext<ContextProps>({
	patrimonies: [],
	setValuesPatrimonies: () => {},
});
