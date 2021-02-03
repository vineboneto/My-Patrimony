import React from "react";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import api from "services/api";
import * as loadPatrimonies from "./loadPatrimonies";

const PatrimonyItems = () => {
	const { patrimonies, setValuesPatrimonies, ownerId } = React.useContext(
		Context.PatrimonyOwnerContext
	);

	React.useEffect(() => {
		setStatePatrimoniesByOwnerId();
	}, [ownerId]);

	const setStatePatrimoniesByOwnerId = async () => {
		const patrimoniesValues = await loadPatrimonies.getApiPatrimoniesDataById(
			ownerId
		);
		setValuesPatrimonies(patrimoniesValues);
	};

	const handleSelectPatrimony = (id: number) => {
		const patrimoniesSelected = changeStateOfSelectedPatrimonies(id);
		setValuesPatrimonies(patrimoniesSelected);
	};

	const changeStateOfSelectedPatrimonies = (id: number) => {
		const newPatrimonies = patrimonies.map((patrimony) => {
			if (patrimoniesEquals(patrimony.id, id)) {
				patrimony.isSelect = !patrimony.isSelect;
				return patrimony;
			}
			return patrimony;
		});
		return newPatrimonies;
	};

	const patrimoniesEquals = (a: number, b: number) => {
		if (a === b) return true;
		return false;
	};

	return (
		<Styled.PatrimonyContainer>
			{patrimonies.map((patrimony: Context.PatrimoniesItemData) => (
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

export default React.memo(PatrimonyItems);
