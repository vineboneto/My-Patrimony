import React from "react";
import SearchBlock from "pages/Transfer/components/SearchBlock";
import PatrimonyItems from "pages/Transfer/components/PatrimonyItems";
import * as Styled from "./styled";

interface Props {
	title: string;
}

const OwnerItem: React.FC<Props> = ({ title }) => {
	return (
		<Styled.OwnerItem>
			<Styled.Title>{title}</Styled.Title>
			<SearchBlock title="Primeiro Proprietário" />
			<PatrimonyItems />
		</Styled.OwnerItem>
	);
};

export default OwnerItem;
