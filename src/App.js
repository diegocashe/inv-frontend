import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles'
import { theme1 } from "./theme/Themes";
import AppRoutes from "./config/AppRoutes";
import { UserContextProvider } from "./context/UserContext";

function App() {
  
  return (
    <BrowserRouter>
      <UserContextProvider>
        <ThemeProvider theme={theme1} >
          <AppRoutes />
        </ThemeProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
