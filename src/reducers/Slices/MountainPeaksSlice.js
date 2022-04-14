import { createSlice } from '@reduxjs/toolkit';
import api, { buildErrorMessage } from '../../utils/api';
import Constants from '../../constants';

const initialState = {
  mountainPeaks: [],
  error: undefined,
  loading: false,
  submitted: false,
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
    formLoading(state, action) {
      state.loading = action.payload;
    },
    formSubmitted(state, action) {
      state.submitted = action.payload;
    },
    formSubmittedError(state, action) {
      state.error = action.payload;
    },
  }
});

export const {
    mountainPeaksFetched,
    mountainPeaksFetching,
    mountainPeaksFetchedError,
    formSubmitted,
    formSubmittedError,
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

export const updateMountainPeak = (id, payload) => async (dispatch) => {
  dispatch(formSubmittedError(undefined));
  dispatch(formSubmitted(false));
  try {
    await api.updateMountainPeak(id, payload);
    const response = await api.mountainPeaksAll();
    dispatch(mountainPeaksFetched(response.data));
  } catch (error) {
    dispatch(formSubmittedError('Error on submitting mountain peak form for update'));
  } finally {
    dispatch(formSubmitted(true));
  }
};


export const createMountainPeak = (payload) => async (dispatch) => {
  dispatch(formSubmittedError(undefined));
  dispatch(formSubmitted(false));
  try {
    await api.createMountainPeak(payload);
    const response = await api.mountainPeaksAll();
    dispatch(mountainPeaksFetched(response.data));
  } catch (error) {
    dispatch(formSubmittedError('Error on submitting mountain peak form for creation'));
  } finally {
    dispatch(formSubmitted(true));
  }
};
