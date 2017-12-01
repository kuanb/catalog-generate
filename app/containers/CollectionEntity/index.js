/*
 * CollectionEntity
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { makeSelectSchema, makeSelectCollection, makeSelectCollectionName, makeSelectCollectionError } from './selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import H1 from 'components/H1';
import PageContainer from 'components/PageContainer';
import PageSection from 'containers/PageSection';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { actionSetCollectionName, actionLoadCollection, actionLoadSchema, actionLeaveCollection } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Form from "react-jsonschema-form";

export class CollectionEntity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

  }
  componentWillUnmount() {
    const { leaveCollection } = this.props;
    leaveCollection();
  }

  componentWillMount() {
    const { doc, schema, loadSchema, loadCollection, repos, error } = this.props;
    console.log(this.props);

    if (doc === false && error === false) {
      // TODO: get from router.
      loadCollection(window.location.pathname.substr(1));
    }
    if (schema === false) {
      loadSchema();
    }
  }

  render() {
    const { schema, loading, error, repos, doc, collectionName } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    const pageSchema = schema ? schema.pageSchema[collectionName] : false;
    const collectionSchema = schema ? schema.schema[collectionName] : false;

    const title = doc ? doc.title : '';

    return (
      <PageContainer>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className="row">
          <div className="col-sm-3">
            <PageSection type="Left" pageSchema={pageSchema} schema={collectionSchema} doc={doc} />
          </div>
          <div className="col-sm-9">
            <H1>{title}</H1>
            <PageSection type="Main" pageSchema={pageSchema} schema={collectionSchema} doc={doc} />
            <PageSection type="Table" pageSchema={pageSchema} schema={collectionSchema} doc={doc} />
          </div>
        </div>
      </PageContainer>
    );
  }
}

CollectionEntity.propTypes = {
  collectionName: PropTypes.string,
  doc: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  formData: PropTypes.object,
  schema: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  path: PropTypes.string,
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  // Dispatch.
  loadCollection: PropTypes.func,
  loadSchema: PropTypes.func,
  leaveCollection: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadCollection: (path) => dispatch(actionLoadCollection(path)),
    loadSchema: () => dispatch(actionLoadSchema()),
    leaveCollection: () => dispatch(actionLeaveCollection()),
    setCollectionName: () => dispatch(actionSetCollectionName()),
  };
}

const mapStateToProps = createStructuredSelector({
  doc: makeSelectCollection(),
  collectionName: makeSelectCollectionName(),
  schema: makeSelectSchema(),
  loading: makeSelectLoading(),
  error: makeSelectCollectionError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'collections', reducer });
const withSaga = injectSaga({ key: 'colllections', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CollectionEntity);
