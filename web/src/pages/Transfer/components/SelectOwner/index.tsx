import React from "react";
import Select, { OptionValues } from "components/Select";
import { PatrimonyOwnerContext } from "pages/Transfer/hooks/context";
import * as SelectProps from "react-select";
import * as Styled from "./styled";
import * as loadOwners from "./loadOwners";
import { ActionsProps } from "pages/Transfer/hooks/types";

const SelectOwner: React.FC = () => {
	const { state, dispatch } = React.useContext(PatrimonyOwnerContext);

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
	) =>
		dispatch({
			type: ActionsProps.SET_OWNER,
			ownerData: { ownerId: ownerOption?.value },
			messageError: "",
		});

	return (
		<Styled.SearchBlock>
			<Select
				error={state.messageError}
				name="optionOwner"
				label="Nome"
				options={ownerOptions}
				onChange={handleChangeSelect}
			/>
		</Styled.SearchBlock>
	);
};

export default SelectOwner;
