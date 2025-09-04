import { RouterProvider } from "react-router";
import { router } from "./routes";
import RootProvider from "./providers";
import { CustomToastProvider } from "./components";

function App() {
   return (
      <RootProvider>
         <CustomToastProvider>
            <RouterProvider router={router} />
         </CustomToastProvider>
      </RootProvider>
   );
}

export default App;
