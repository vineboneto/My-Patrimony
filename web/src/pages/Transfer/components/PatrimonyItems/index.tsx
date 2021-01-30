import React, { useContext } from "react";
import * as Context from "pages/Transfer/PatrimonyTransferContext";
import * as Styled from "./styled";

const PatrimonyItems = () => {
	const { patrimonies, setValuesPatrimonies } = useContext(
		Context.PatrimonyTransferContext
	);

	const handleSelectPatrimony = (patrimony: Context.StateProps) => {
		const newPatrimonies = patrimonies.map((value, index) => {
			if (value.id === patrimony.id) {
				value.isSelect = !value.isSelect;
				return value;
			}
			return value;
		});
		setValuesPatrimonies(newPatrimonies);
	};

	return (
		<Styled.PatrimonyContainer>
			{patrimonies.map((patrimony: Context.StateProps) => (
				<Styled.PatrimonyItem
					key={patrimony.id}
					select={patrimony.isSelect}
					onClick={() => handleSelectPatrimony(patrimony)}
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
