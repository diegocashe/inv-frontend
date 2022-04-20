import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";
import { UserContextProvider } from "./context/UserContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { LoadAppContextProvider } from "./context/LoadAppContext";
import "@fontsource/manrope"
import { CookiesProvider } from "react-cookie";
import { SnackbarContextProvider } from "./context/SnackbarContext";
function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <UserContextProvider>
          <ThemeContextProvider >
            <LoadAppContextProvider>
              <SnackbarContextProvider>
                <AppRoutes />
              </SnackbarContextProvider>
            </LoadAppContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
