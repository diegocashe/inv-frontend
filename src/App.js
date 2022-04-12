import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./config/AppRoutes";
import { UserContextProvider } from "./context/UserContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { LoadAppContextProvider } from "./context/LoadAppContext";
import "@fontsource/manrope"
import { CookiesProvider } from "react-cookie";
function App() {

  return (
    <CookiesProvider>
      <BrowserRouter>
        <UserContextProvider>
          <ThemeContextProvider >
            <LoadAppContextProvider>
              <AppRoutes />
            </LoadAppContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
