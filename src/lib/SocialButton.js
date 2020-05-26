import React from "react";
import SocialLogin from "react-social-login";
import { Button } from "@material-ui/core";

class SocialButton extends React.Component {
  render() {
    const { triggerLogin, ...props } = this.props;
    return (
      <Button
        fullWidth={true}
        variant="contained"
        onClick={triggerLogin}
        {...props}
      />
    );
  }
}

export default SocialLogin(SocialButton);
