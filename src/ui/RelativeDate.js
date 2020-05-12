import React from "react";
import { injectIntl, FormattedRelativeTime } from "react-intl";
import { Tooltip } from "@material-ui/core";

const MyFormattedRelative = injectIntl(({ date, prefix, intl }) => {
  var title = `${intl.formatDate(date)} às ${intl.formatTime(date)}`;
  const delta =
    Math.floor(new Date(date) / 1000) - Math.floor(Date.now() / 1000);
  return (
    <FormattedRelativeTime
      value={delta}
      numeric="auto"
      unit="second"
      updateIntervalInSeconds={30}
    >
      {(formattedTime) => (
        <Tooltip title={title} placement="top">
          <time dateTime={date}>
            {prefix && `${prefix} `}
            {formattedTime}
          </time>
        </Tooltip>
      )}
    </FormattedRelativeTime>
  );
});

export class RelativeDate extends React.Component {
  render() {
    return (
      <MyFormattedRelative date={this.props.date} prefix={this.props.prefix} />
    );
  }
}

export default RelativeDate;
