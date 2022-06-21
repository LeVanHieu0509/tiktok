import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import React, { useState } from 'react';

import { Wrapper as PopperWrrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => {};

export default function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  //reset to first page
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrrapper className={cx('menu-popper')}>
        {history.length > 1 && <Header title={current.title} onBack={handleReset} />}
        {renderItems()}
      </PopperWrrapper>
    </div>
  );

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleResetToFirstPage = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      hideOnClick={hideOnClick}
      offset={[12, 8]}
      delay={[0, 700]}
      placement="bottom-end"
      interactive={true}
      render={renderResult}
      onHide={handleResetToFirstPage}
    >
      {children}
    </Tippy>
  );
}

Menu.prototype = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};
