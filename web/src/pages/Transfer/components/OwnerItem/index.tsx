import React from "react";
import Select from "components/test/Select";
import PatrimonyItems from "pages/Transfer/components/PatrimonyItems";
import { PatrimonyOwnerContext } from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import api from "services/api";
import { OptionTypeBase, ValueType } from "react-select";

interface Props {
	title: string;
	ownerId: number;
	onChangeId: (id: number) => void;
}

interface ApiPatrimoniesData {
	id: number;
	model: string;
	number: string;
	Category: {
		id: number;
		name: string;
	};
}

interface ApiData {
	id: number;
	name: string;
}

interface OptionValues {
	value: number;
	label: string;
}

const OwnerItem: React.FC<Props> = ({ title, ownerId, onChangeId }) => {
	const { setValuesPatrimonies } = React.useContext(PatrimonyOwnerContext);

	React.useEffect(() => {
		setPatrimonies();
	}, [ownerId]);

	const setPatrimonies = async () => {
		const patrimoniesValues = await getApiPatrimoniesDataById();
		console.log(patrimoniesValues);
		setValuesPatrimonies(convertToStatePropsData(patrimoniesValues));
	};

	const getApiPatrimoniesDataById = async () => {
		const url = `owners/${ownerId}/patrimonies`;
		const response = await api.get(url);
		return response.data;
	};

	const convertToStatePropsData = (datas: ApiPatrimoniesData[]) => {
		const patrimonies = datas.map((data) => {
			return {
				id: data.id,
				model: data.model,
				patrimonyNumber: data.number,
				categoryName: data.Category.name,
				isSelect: false,
			};
		});
		return patrimonies;
	};

	const handleChange = (ownerOption: ValueType<OptionTypeBase, false>) =>
		onChangeId(ownerOption?.value);

	const [ownerOptions, setOwnerOptions] = React.useState([]);
	const setOwnerValuesState = React.useCallback(async () => {
		const ownerValues = await getApiOwnerData();
		setOwnerOptions(convertToOptionsValues(ownerValues));
	}, []);

	React.useEffect(() => {
		setOwnerValuesState();
	}, [setOwnerValuesState]);

	const getApiOwnerData = async () => {
		const response = await api.get("owners");
		return response.data;
	};

	const convertToOptionsValues = (datas: any) => {
		const options = datas.map((data: ApiData) => {
			return {
				value: data.id,
				label: data.name,
			};
		});
		return options;
	};

	return (
		<Styled.OwnerItem>
			<Styled.Title>{title}</Styled.Title>
			<Select
				name="optionOwner"
				label="Nome"
				options={ownerOptions}
				onChange={handleChange}
			/>
			<PatrimonyItems />
		</Styled.OwnerItem>
	);
};

export default OwnerItem;
