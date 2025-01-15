"use client";

import { StyledEngineProvider } from "@mui/material/styles";
import { store } from "@/api/store";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

function ClientWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {children}
      </Provider>
    </StyledEngineProvider>
  );
}

export default ClientWrapper;
