import styled from 'styled-components';
import { CursorMixins } from '../../../primitives';
import { ButtonProps } from '../Button';

const StyledButton = styled.button<ButtonProps>`
	${CursorMixins}
`;

export default StyledButton;
