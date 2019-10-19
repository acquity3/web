import React from 'react';

import { useUser } from 'contexts/userContext';
import PageContainer from 'components/pageContainer';
import OngoingItems from './ongoingItems';
import RoundDetails from './roundDetails';

import './Main.scss';

const Main = () => {
  const user = useUser();

  return (
    <PageContainer>
      <div className="main page">
        <div className="page__content">
          {user.canSell && (
            <>
              <OngoingItems type="offers" />
              <div className="is-divider main__content__divider" />
            </>
          )}
          <OngoingItems type="bids" />
          <div className="is-divider main__content__divider" />
          <RoundDetails />
        </div>
      </div>
    </PageContainer>
  );
};

export default Main;
