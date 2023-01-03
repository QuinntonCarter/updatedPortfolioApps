import React, { forwardRef } from 'react';

const Button = forwardRef((props, ref) => {
  const { onClick, children, className, type, ...remainingProps } = props;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={className}
      type={type}
      {...remainingProps}
    >
      {children}
    </button>
  );
});

Button.defaultProps = {
  type: 'button',
};

export default Button;
