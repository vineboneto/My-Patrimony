import React from "react";
import Select, { OptionValues } from "components/Select";
import { PatrimonyOwnerContext } from "pages/Transfer/hooks/context";
import * as SelectProps from "react-select";
import * as Styled from "./styled";
import * as loadOwners from "./loadOwners";
interface Props {
	title: string;
}

const SearchBlock: React.FC<Props> = ({ title }) => {
	const { setOwnerId } = React.useContext(PatrimonyOwnerContext);

	const [ownerOptions, setOwnerOptions] = React.useState<OptionValues[]>([]);

	const setOwnerValuesState = React.useCallback(async () => {
		const ownerValues = await loadOwners.getApiOwnerData();
		setOwnerOptions(ownerValues);
	}, []);

	React.useEffect(() => {
		setOwnerValuesState();
	}, [setOwnerValuesState]);

	const handleChangeSelect = (
		ownerOption: SelectProps.ValueType<SelectProps.OptionTypeBase, false>
	) => setOwnerId(ownerOption?.value);

	return (
		<Styled.SearchBlock>
			<Styled.Title>{title}</Styled.Title>
			<Select
				name="optionOwner"
				label="Nome"
				options={ownerOptions}
				onChange={handleChangeSelect}
			/>
		</Styled.SearchBlock>
	);
};

export default SearchBlock;
