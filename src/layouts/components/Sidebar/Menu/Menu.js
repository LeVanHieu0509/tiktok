import React from 'react';
import PropTypes from 'prop-types';
export default function Menu({ children }) {
  return <div>{children}</div>;
}
Menu.prototype = {
  children: PropTypes.node.isRequired,
};
