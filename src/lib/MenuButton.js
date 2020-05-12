import React from "react";
import { Menu, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { children, ...otherProps } = this.props;

    if (!children) {
      return null;
    }

    return (
      <React.Fragment>
        <IconButton aria-label="settings" onClick={this.handleOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          {...otherProps}
        >
          {children}
        </Menu>
      </React.Fragment>
    );
  }
}

export default MenuButton;
