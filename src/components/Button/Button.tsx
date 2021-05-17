import { useToggle } from '@alehechka/react-hooks';
import React, { forwardRef, useCallback } from 'react';
import StyledButton from './styled/StyledButton';

type ButtonMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

type Props = {
    /**
     * Label of button, can be used instead of wrapping children.
     */
    label?: string;
    /**
     * Callback function to run when button is clicked.
     * A Promise will put the Button in pending state until resolved/rejected.
     */
    onClick?: (event: ButtonMouseEvent) => void | Promise<any>;
    /**
     * Pending state of button.
     */
    pending?: boolean;
    /**
     * Disabled state of button.
     */
    disabled?: boolean;
  };

  export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof Props> & Props;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({label, children, onClick, disabled, pending, ...otherProps}, ref) => {

    const [loading, , startLoading, stopLoading] = useToggle();

    const handleClick = useCallback(async (event: ButtonMouseEvent) => {
        if (onClick === undefined) return;
        startLoading();
        await onClick(event);
        stopLoading();
    }, [onClick])

	return <StyledButton ref={ref} onClick={handleClick} disabled={disabled} pending={pending || loading} {...otherProps}>{label || children}</StyledButton>;
});

export default Button;
