export enum ActionsProps {
	LOAD_PATRIMONIES = "@LOAD_PATRIMONIES",
	LOAD_OWNERS = "@LOAD_OWNERS",
	SET_OWNER = "@SET_OWNER",
	SET_PATRIMONY = "@SET_PATRIMONY",
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
	ownersData: OwnerData[];
	patrimoniesData: PatrimonyData[];
	messageError: string;
}
