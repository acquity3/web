/* eslint-disable no-param-reassign */
import { createSlice } from 'redux-starter-kit';

import { BUYER } from 'constants/user';

const misc = createSlice({
  name: 'misc',
  initialState: {
    userType: BUYER,
    user: null
  },
  reducers: {
    setUserType: (state, { payload }) => {
      state.userType = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    }
  }
});

export const { setUserType, setUser } = misc.actions;

export default misc.reducer;
