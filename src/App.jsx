import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        maxSnack={3}
        autoHideDuration={2000}
        dense
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
