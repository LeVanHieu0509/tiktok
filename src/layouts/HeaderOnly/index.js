import React from 'react';
import Header from '~/layouts/components/Header';

export default function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="contained">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
