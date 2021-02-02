export interface PatrimoniesItemData {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect: boolean;
}

export interface StateProps {
	loadRequest: boolean;
	datas: PatrimoniesItemData[];
}
