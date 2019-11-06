import React, { useCallback } from 'react';
import { reqArchive } from 'reducers/ChatDux';
import { useDispatch, useSelector } from 'react-redux';

const ChatArchiveButton = ({ isArchived }) => {
  const dispatch = useDispatch();
  const chatRoomId = useSelector(state => state.chat.chatRoomId);
  const userType = useSelector(state => state.misc.userType);

  const archiveCallback = useCallback(() => {
    dispatch(
      reqArchive({
        chatRoomId,
        userType,
        isArchived
      })
    );
  }, [dispatch, chatRoomId, userType, isArchived]);

  const handleArchive = () => {
    archiveCallback();
  };

  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        {/* eslint-disable-next-line react/button-has-type */}
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu4"
        >
          <span>Archive me!</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu4" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={handleArchive}>Click to archive!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArchiveButton;
