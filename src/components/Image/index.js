import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { forwardRef, useState } from 'react';

import images from '~/assets/images';
import styles from './Image.module.scss';

function Image({ fallback: customFallback = images.noImage, src, alt, className, ...props }, ref) {
  //image loi thi hien thi anh loi
  //   console.log(images);
  const [fallback, setFallBack] = useState('');

  //khi không truyền fallback từ ngoài vào thì nó sẽ sử dụng no image,
  // còn nếu như truyền thì nó sẽ lấy bên ngoài vào
  const handleError = () => {
    setFallBack(customFallback);
  };

  // eslint-disable-next-line jsx-a11y/alt-text
  return (
    <img
      src={fallback || src}
      alt={alt}
      className={classNames(styles.wrapper, className)}
      ref={ref}
      {...props}
      onError={handleError}
    />
  );
}
export default forwardRef(Image);

Image.prototype = {
  fallback: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};
