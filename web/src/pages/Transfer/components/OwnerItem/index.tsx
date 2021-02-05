import React from "react";
import SelectOwner from "pages/Transfer/components/SelectOwner";
import PatrimonyItems from "pages/Transfer/components/PatrimonyItems";
import * as Styled from "./styled";

interface Props {
	title: string;
}

const OwnerItem: React.FC<Props> = ({ title }) => {
	return (
		<Styled.OwnerItem>
			<Styled.Title>{title}</Styled.Title>
			<SelectOwner />
			<PatrimonyItems />
		</Styled.OwnerItem>
	);
};

export default OwnerItem;
