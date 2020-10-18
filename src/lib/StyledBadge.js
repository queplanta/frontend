import React from "react";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";

const CustomBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    color: "#ffffff",
  },
}))(Badge);

export default function StyledBadge(props) {
  const { max, badgeContent, color, showZero } = props;

  return (
    <CustomBadge
      max={max}
      badgeContent={badgeContent}
      color={color}
      showZero={showZero}
    >
      {props.children}
    </CustomBadge>
  );
}

StyledBadge.propTypes = {
  badgeContent: PropTypes.any.isRequired,
};

StyledBadge.defaultProps = {
  badgeContent: 0,
  max: 999,
  color: "primary",
  showZero: false,
};
