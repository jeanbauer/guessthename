import React from 'react';
import PropTypes from 'prop-types';
import './styles/Button.css';

const Button = (props) => {
  let btnWrapperClasses = 'button';

  if (props.secondary) {
    btnWrapperClasses += ' button--state-secondary';
  } else if (props.success) {
    btnWrapperClasses += ' button--state-success';
  } else if (props.disabled) {
    btnWrapperClasses += ' button--state-disabled';
  }

  return (
    <button
        style={props.style}
        id={props.id}
        className={btnWrapperClasses}
        onClick={props.onClick}
        disabled={props.disabled}
    >

     <span id={props.id} className="button-text">{props.text}</span>
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Button;
