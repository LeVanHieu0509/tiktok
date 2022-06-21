import { useEffect, useRef, useState } from 'react';

import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { Wrapper as PopperWrrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/searchService';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoadding] = useState(false);
  const debounceValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    // call api
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoadding(true);

      const result = await searchServices.search(debounceValue);
      setSearchResult(result);

      setLoadding(false);
    };

    fetchApi();
  }, [debounceValue]);

  const handleClear = () => {
    setSearchValue('');
    inputRef.current.focus();
    setSearchResult([]);
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleSubmit = (e) => {};

  return (
    //Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context in tippy react.
    <div>
      <HeadlessTippy
        onClickOutside={handleHideResult}
        visible={showResult && searchResult.length > 0}
        interactive={true}
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrrapper>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrrapper>
          </div>
        )}
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            onChange={handleChange}
            spellCheck={false}
            placeholder="Search account and video..."
            type="text"
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cx('clear')} onClick={handleClear}>
              {/* clear */}
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {/* loadding */}
          {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} onClick={handleSubmit}>
            {/* search */}
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}
