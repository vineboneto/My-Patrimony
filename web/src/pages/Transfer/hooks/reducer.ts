import { StateProps, ActionsProps } from "./types";

export const INITIAL_STATE: StateProps = {
	ownersData: [],
	patrimoniesData: [],
	messageError: "",
};

export const reducer = (state: StateProps, action: any) => {
	switch (action.type) {
		case ActionsProps.LOAD_OWNERS:
			return { ...state };
		case ActionsProps.LOAD_PATRIMONIES:
			return { ...state };
		case ActionsProps.SET_OWNER:
			return { ...state };
		case ActionsProps.SET_PATRIMONY:
			return { ...state };
		default:
			return state;
	}
};
