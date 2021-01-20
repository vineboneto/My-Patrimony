import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";

export const StyledDialog = styled(Dialog)`
	.MuiDialog-paper {
		overflow-y: visible;
	}
`;

export const DialogContainer = styled.div`
	width: 60rem;
	height: auto;
`;

export const Title = styled.div`
	color: var(--color-label-input);
`;
