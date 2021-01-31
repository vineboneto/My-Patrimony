import React from "react";
import { FormHandles } from "@unform/core";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import PatrimonyItems from "pages/Transfer/components/PatrimonyItems";
import * as Styled from "./styled";

interface Props {
	title: string;
	formRefs: React.MutableRefObject<(FormHandles | null)[]>;
}

const OwnerItem: React.FC<Props> = ({ title, formRefs }) => {
	return (
		<Styled.OwnerItem>
			<Styled.Title>{title}</Styled.Title>
			<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
			<PatrimonyItems />
		</Styled.OwnerItem>
	);
};

export default OwnerItem;
