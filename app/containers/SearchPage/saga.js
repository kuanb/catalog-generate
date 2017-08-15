// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';

import { LOAD_SEARCH_RESULTS } from './constants';
import { searchResultsLoaded, searchResultsError } from './actions';

import request from 'utils/request';
import { makeSelectQuery } from 'containers/SearchPage/selectors';
import elasticlunr from 'elasticlunr';

//const elasticlunr = require('elasticlunr');


/**
 * Get Search results.
 */
export function* getResults() {

  const url = window.location.origin + '/search-index.json';

  const query = 'test';//yield select(makeSelectQuery());


  console.log(url);
  try {
    // Call our request helper (see 'utils/request')
    const results = yield call(request, url);
    console.log(results);
    const index = elasticlunr.Index.load(results);
    console.log(index);
//    index.SaveDocument(true);
    const config = new elasticlunr.Configuration({ SaveDocument: true}, index.getFields());
    console.log(config);
    const items = index.search(query, config);
    console.log(items);
    yield put(searchResultsLoaded(items));
  } catch (err) {
    console.log("error?", err);
    yield put(searchResultsError(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* searchData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SEARCH_RESULTS, getResults);

}