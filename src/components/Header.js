import React from 'react';
import PropTypes from 'prop-types';
import Progress from 'react-progressbar';

const Header = (props) => {
  const minimalProgress = props.progress < 1 ? 10 : props.progress;
  return (
    <header className="App-header">
      <Progress completed={minimalProgress} />
    </header>
  );
};

Header.propTypes = {
  id: PropTypes.string,
};

export default Header;
