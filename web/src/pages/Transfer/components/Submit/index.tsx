import React from "react";
import sendIcon from "assets/images/icons/sendIcon.svg";
import * as Styled from "./styled";

interface Props {
	handleSubmit: (e: React.MouseEvent) => void;
}

export const Submit: React.FC<Props> = ({ handleSubmit }) => {
	return (
		<Styled.ButtonContainer>
			<Styled.ButtonSend onClick={handleSubmit}>
				Transferir
				<img src={sendIcon} alt="Transferir Patrimônio" />
			</Styled.ButtonSend>
		</Styled.ButtonContainer>
	);
};

export default React.memo(Submit);
