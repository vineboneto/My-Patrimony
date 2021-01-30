import { createContext } from "react";

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

export const FirstOwnerContext = createContext<ContextProps>({
	patrimonies: [],
	setValuesPatrimonies: () => {},
});
