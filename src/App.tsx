import { RouterProvider } from "react-router";
import { router } from "./routes";
import RootProvider from "./providers";

function App() {
   return <RootProvider>
      <RouterProvider router={router} />
   </RootProvider>;
}

export default App;
