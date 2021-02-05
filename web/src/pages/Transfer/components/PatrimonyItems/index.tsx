import React from "react";
import { ActionsProps } from "pages/Transfer/hooks/types";
import { getApiPatrimoniesDataById } from "pages/Transfer/service/loadPatrimonies";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as utils from "./selectPatrimony";

const PatrimonyItems = () => {
	const { state, dispatch } = React.useContext(Context.PatrimonyOwnerContext);

	React.useEffect(() => {
		const setStatePatrimoniesByOwnerId = async () => {
			const patrimoniesValues = await getApiPatrimoniesDataById(
				state.ownerData.ownerId
			);
			dispatch({
				type: ActionsProps.SET_PATRIMONIES,
				patrimoniesData: patrimoniesValues,
				messageErrors: "",
			});
		};
		setStatePatrimoniesByOwnerId();
	}, [state.ownerData.ownerId, dispatch]);

	const handleSelectPatrimony = (id: number) => {
		const patrimoniesSelected = utils.changeStateOfSelectedPatrimonies(
			id,
			state.patrimoniesData
		);
		dispatch({
			type: ActionsProps.SET_PATRIMONIES,
			patrimoniesData: patrimoniesSelected,
		});
	};

	return (
		<Styled.PatrimonyContainer>
			{state.patrimoniesData.map((patrimony) => (
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
