import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Container = ({ children }) => {
  return (
    <div className="columns is-marginless is-mobile is-centered">
      <div className="is-container column is-two-thirds-tablet is-four-fifths-mobile">
        <div className="content-container">
          <SimpleBar className="page-content-container">{children}</SimpleBar>
        </div>
      </div>
    </div>
  );
};

export default Container;
