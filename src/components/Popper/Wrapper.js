import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React from 'react';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

export default function Wrapper({ children, className }) {
  return <div className={cx('wrapper', className)}>{children}</div>;
}

Wrapper.prototype = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
