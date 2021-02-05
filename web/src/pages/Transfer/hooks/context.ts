import React from "react";
import { StateProps } from "./types";
import { INITIAL_STATE } from "./reducer";

interface ContextProps {
	state: StateProps;
	dispatch: React.Dispatch<any>;
}

export const PatrimonyOwnerContext = React.createContext<ContextProps>({
	state: INITIAL_STATE,
	dispatch: () => {},
});
