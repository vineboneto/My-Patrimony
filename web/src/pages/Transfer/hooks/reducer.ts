import { StateProps, ActionsProps } from "./types";

export const INITIAL_STATE: StateProps = {
	ownerData: { ownerId: -1 },
	patrimoniesData: [],
	messageError: "",
};

export const reducer = (state: StateProps, action: any) => {
	switch (action.type) {
		case ActionsProps.SET_OWNER:
			return {
				...state,
				ownerData: action.ownerData,
				messageError: action.messageError,
			};
		case ActionsProps.SET_PATRIMONIES:
			return {
				...state,
				patrimoniesData: action.patrimoniesData,
				messageError: action.messageError,
			};
		case ActionsProps.SET_ERRORS:
			return { ...state, messageError: action.messageError };
		default:
			return state;
	}
};
