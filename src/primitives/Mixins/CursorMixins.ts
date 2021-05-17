import { css } from 'styled-components';
import { CSSProperties } from 'react';

export type CursorOverride = CSSProperties['cursor'];

export type CursorMixinsProps = {
	disabled?: boolean;
	pending?: boolean;
	override?: CursorOverride;
};

type CursorProps = CursorMixinsProps & {
	hover?: boolean;
};

const getCursor = (props: CursorProps) => {
	if (props.override) return props.override;
	if (props.pending) return 'progress';
	if (props.disabled) return 'not-allowed';

	if (props.hover) return 'pointer';
	return 'inherit';
};

export const CursorMixins = css<CursorMixinsProps>`
	cursor: ${getCursor};

	&:hover {
		cursor: ${props => getCursor({ ...props, hover: true })};
	}
`;

export default CursorMixins;
