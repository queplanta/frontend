import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import { ptBR } from "@material-ui/core/locale";

const theme = createMuiTheme(
  {
    palette: {
      primary: green,
    },
  },
  ptBR
);

export default responsiveFontSizes(theme);
