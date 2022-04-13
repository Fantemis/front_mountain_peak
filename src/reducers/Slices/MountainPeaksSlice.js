import { createSlice } from '@reduxjs/toolkit';
import api, { buildErrorMessage } from '../../utils/api';
import Constants from '../../constants';

const initialState = {
  mountainPeaks: [],
  error: undefined,
  loading: false,
  filter: ''
};

const mountainPeaksSlice = createSlice({
  name: 'mountainPeaks',
  initialState,
  reducers: {
    mountainPeaksFetched(state, action) {
      state.mountainPeaks = action.payload;
    },
    mountainPeaksFetching(state, action) {
      state.loading = action.payload;
    },
    mountainPeaksFetchedError(state, action) {
      state.error = action.payload;
    },
  }
});

export const {
    mountainPeaksFetched,
    mountainPeaksFetching,
    mountainPeaksFetchedError,
} = mountainPeaksSlice.actions;

export default mountainPeaksSlice.reducer;

export const fetchMountainPeaks = () => async (dispatch) => {
  dispatch(mountainPeaksFetchedError(undefined));
  dispatch(mountainPeaksFetching(true));
  try {
    const response = await api.mountainPeaksAll();
    dispatch(mountainPeaksFetched(response.data));
  } catch (error) {
    dispatch(mountainPeaksFetchedError('Error on fetching mountain peaks'));
  } finally {
    dispatch(mountainPeaksFetching(false));
  }
};