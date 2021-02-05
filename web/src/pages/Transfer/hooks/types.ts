export enum ActionsProps {
	SET_OWNER = "@SET_OWNER",
	SET_PATRIMONIES = "@SET_PATRIMONIES",
	SET_ERRORS = "@SET_ERRORS",
}

export interface PatrimonyData {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect: boolean;
}

export interface OwnerData {
	ownerId: number;
}

export interface StateProps {
	ownerData: OwnerData;
	patrimoniesData: PatrimonyData[];
	messageError: string;
}
