import "./GlobalStyles.scss";
import PropTypes from 'prop-types';

export default function GlobalStyles({ children }) {
  return children;
}

GlobalStyles.prototype = {
  children: PropTypes.node.isRequired
}
