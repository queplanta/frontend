import React from 'react';
import {
	injectIntl,
	FormattedRelative,
} from 'react-intl';
import {Tooltip} from '@material-ui/core';

const MyFormattedRelative = injectIntl(({date, intl}) => {
  var title = `${intl.formatDate(date)} às ${intl.formatTime(date)}`;
  return (<FormattedRelative value={date}>
    {(formattedTime) => <Tooltip title={title} placement="top">
      <time dateTime={date}>{formattedTime}</time>
    </Tooltip>}
  </FormattedRelative>);
});

export class RelativeDate extends React.Component {
  render() {
    return <MyFormattedRelative date={this.props.date} />
  }
}

export default RelativeDate
