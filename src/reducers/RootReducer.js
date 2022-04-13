import { combineReducers } from 'redux';
import mountainPeaksReducer from './Slices/MountainPeaksSlice';


export default combineReducers({
  mountainPeaks: mountainPeaksReducer,
});
