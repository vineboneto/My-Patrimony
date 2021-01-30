import React, { useContext } from "react";
import * as Context from "pages/Transfer/PatrimonyTransferContext";
import * as Styled from "./styled";

const PatrimonyItems = () => {
	const { patrimonies, setValuesPatrimonies } = useContext(
		Context.FirstOwnerContext
	);

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
			{patrimonies.map((patrimony: Context.StateProps) => (
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
