/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListItem from 'components/ListItem';
import Wrapper from './Wrapper';
import StyledLink from './StyledLink';
import PageItemString from 'components/PageItemString';
import PageItemText from 'components/PageItemText';
import PageItemOrg from 'components/PageItemOrg';
import PageItemTag from 'components/PageItemTag';
import PageItemTheme from 'components/PageItemTheme';
import PageItemResource from 'components/PageItemResource';
import SectionTypeMain from 'components/SectionTypeMain';
import SectionTypeTitle from 'components/SectionTypeTitle';
import SectionTypeLeft from 'components/SectionTypeLeft';
import SectionTypeTable from 'components/SectionTypeTable';

export class PageSection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {

    const pageItems = {
      PageItemOrg,
      PageItemString,
      PageItemText,
      PageItemTag,
      PageItemTheme,
      PageItemResource,
    };
    const SectionTypes = {
      SectionTypeMain,
      SectionTypeLeft,
      SectionTypeTable,
      SectionTypeTitle,
    };
    const { doc, pageSchema, schema, type } = this.props;
    const SectionComponent = SectionTypes[`SectionType${type}`];
    const fields = pageSchema ? pageSchema[type] : {};
    if (fields && doc) {
      const section = Object.keys(fields).map((field, index) => {
        const Component = pageItems[`PageItem${fields[field].type}`];
        const label = fields[field].label;
        const labelValue = schema.properties[field].title;
        const item = {
          data: {
            field,
            value: doc[field],
          },
        };
        if (field in doc) {
          return (<Component labelValue={labelValue} label={label} key={index} {...item} />);
        }
      },'<div></div>');
      return (
        <SectionComponent {...section} />
      );
    } else {
      return (<span></span>)
    }
  }
}

PageSection.propTypes = {
  doc: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  schema: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  type: PropTypes.string,
};

export default connect()(PageSection);
