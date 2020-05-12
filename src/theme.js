import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default responsiveFontSizes(theme);
