import React from 'react';
import PropTypes from 'prop-types'; 
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

export default function AccountItem({ data }) {
  return (
    <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
      <Image
        src={data.avatar}
        alt={data.full_name}
        className={cx('avatar')}
        //fallback="https://yt3.ggpht.com/wgneNTiW753q5G6XMnjyNLAzReR4TVFJryTKTpIqJefrKMyhABPwfnyNWIoT5NNGstFlva1tgw=s48-c-k-c0x00ffffff-no-rj"
      />
      <div className={cx('info')}>
        <p className={cx('name')}>
          <span>{data.full_name}</span>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </p>
        <span className={cx('username')}>{data.nickname}</span>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  data:PropTypes.object.isRequired
}