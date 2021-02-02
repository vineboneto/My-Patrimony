import { StateProps } from "./types";
export const INITIAL_STATE: StateProps = {
	loadRequest: false,
	datas: [],
};

export const reducer = (state = INITIAL_STATE, action: any) => {
	console.log(action);
	switch (action.type) {
		case "LOAD_REQUEST":
			return { ...state };
		default:
			return state;
	}
};
