import { RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

import "./styles/global.css";

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster position="top-center" richColors />

        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
