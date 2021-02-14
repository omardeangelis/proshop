import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { grey, blue, green } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    info: {
      main: blue[800],
    },
    success: {
      main: green["A400"],
    },
  },
});

const ThemeWrapper = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
