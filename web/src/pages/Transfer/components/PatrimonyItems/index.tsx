import React from "react";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as loadPatrimonies from "./loadPatrimonies";
import * as utils from "./selectPatrimony";

const PatrimonyItems = () => {
	const {
		patrimonies,
		setValuesPatrimonies,
		ownerState,
		setOwnerState,
	} = React.useContext(Context.PatrimonyOwnerContext);

	React.useEffect(() => {
		setStatePatrimoniesByOwnerId();
	}, [ownerState.ownerId]);

	const setStatePatrimoniesByOwnerId = async () => {
		const patrimoniesValues = await loadPatrimonies.getApiPatrimoniesDataById(
			ownerState.ownerId
		);
		setValuesPatrimonies(patrimoniesValues);
	};

	const handleSelectPatrimony = (id: number) => {
		const patrimoniesSelected = utils.changeStateOfSelectedPatrimonies(
			id,
			patrimonies
		);
		setValuesPatrimonies(patrimoniesSelected);
		setOwnerState({ error: "", ownerId: ownerState.ownerId });
	};

	return (
		<Styled.PatrimonyContainer>
			{patrimonies.map((patrimony: Context.PatrimonyState) => (
				<Styled.PatrimonyItem
					key={patrimony.id}
					select={patrimony.isSelect}
					onClick={() => handleSelectPatrimony(patrimony.id)}
				>
					<Styled.CategoryName>{patrimony.categoryName}</Styled.CategoryName>
					<span>{patrimony.model}</span>
					<span>{patrimony.patrimonyNumber}</span>
				</Styled.PatrimonyItem>
			))}
		</Styled.PatrimonyContainer>
	);
};

export default PatrimonyItems;
