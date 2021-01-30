import React, { useContext } from "react";
import * as Context from "pages/Transfer/PatrimonyTransferContext";
import * as Styled from "./styled";

const PatrimonyItems = () => {
	const { patrimonies, setValuesPatrimonies } = useContext(
		Context.PatrimonyTransferContext
	);

	const handleSelectPatrimony = (id: number) => {
		const patrimoniesSelected = getPatrimoniesSelect(id);
		setValuesPatrimonies(patrimoniesSelected);
	};

	const getPatrimoniesSelect = (id: number) => {
		const patrimoniesSelected = patrimonies.map((value) => {
			if (value.id === id) {
				value.isSelect = !value.isSelect;
				return value;
			}
			return value;
		});
		return patrimoniesSelected;
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
