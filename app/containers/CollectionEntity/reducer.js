/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  SET_COLLECTION_NAME,
  LEAVE_COLLECTION,
  LOAD_COLLECTION,
  LOAD_COLLECTION_SUCCESS,
  LOAD_SCHEMA,
  LOAD_SCHEMA_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  username: '',
  collectionName: '',
  doc: false,
  error: false,
  schema: false,
  path: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LEAVE_COLLECTION:
      return initialState;
    case SET_COLLECTION_NAME:
      return state
        .set('collectionName', action.collectionName);
    case LOAD_COLLECTION:
      return state
        .set('loading', true)
        .set('path', action.path);
    case LOAD_COLLECTION_SUCCESS:
      return state
        .set('loading', false)
        .set('doc', action.doc);
    case LOAD_SCHEMA:
      return state
        .set('loading', true)
    case LOAD_SCHEMA_SUCCESS:
      return state
        .set('loading', false)
        .set('schema', action.schema);
    default:
      return state;
  }
}

export default homeReducer;
