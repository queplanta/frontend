import React from 'react';
import {
	injectIntl,
	FormattedRelative,
} from 'react-intl';
import {Tooltip} from '@material-ui/core';

const MyFormattedRelative = injectIntl(({date, prefix, intl}) => {
  var title = `${intl.formatDate(date)} às ${intl.formatTime(date)}`;
  return (<FormattedRelative value={date}>
    {(formattedTime) => <Tooltip title={title} placement="top">
      <time dateTime={date}>{prefix && `${prefix} `}{formattedTime}</time>
    </Tooltip>}
  </FormattedRelative>);
});

export class RelativeDate extends React.Component {
  render() {
    return <MyFormattedRelative date={this.props.date} prefix={this.props.prefix} />
  }
}

export default RelativeDate
