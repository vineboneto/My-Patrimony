import React from "react";
import Select from "components/Select";
import { PatrimonyOwnerContext } from "pages/Transfer/hooks/context";
import * as SelectProps from "react-select";
import * as Styled from "./styled";
import api from "services/api";

interface Props {
	title: string;
}

interface ApiData {
	id: number;
	name: string;
}

const SearchBlock: React.FC<Props> = ({ title }) => {
	const { setOwnerId } = React.useContext(PatrimonyOwnerContext);

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

	const handleChange = (
		ownerOption: SelectProps.ValueType<SelectProps.OptionTypeBase, false>
	) => setOwnerId(ownerOption?.value);

	return (
		<Styled.SearchBlock>
			<Styled.Title>{title}</Styled.Title>
			<Select
				name="optionOwner"
				label="Nome"
				options={ownerOptions}
				onChange={handleChange}
			/>
		</Styled.SearchBlock>
	);
};

export default SearchBlock;
