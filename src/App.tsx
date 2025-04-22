import { Navigate, Route} from "react-router";
import { Routes } from "react-router";
import Week from "./week";
import Login from "./login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./protected-route";


function App() {

  function weekRedirect() {
    const today = new Date(Date.now());
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate() + 1;

    return (
    <>
    <Navigate to={`/app/${year}/${month}/${day}`}/>
    </>
    )
  }

  return (
    <>
      <AuthProvider>
        <Routes>
          
          <Route path="login" element={<Login />} />

          {/*Main App Route With Login Check */}
          <Route path="app" element={<ProtectedRoute />}>
            <Route index element={weekRedirect()} />
            <Route path="*" element={weekRedirect()} />
            <Route path=":year/:month/:day" element={<Week />} />
          </Route>

        </Routes>
      </AuthProvider>
    </>
  )
}
export default App
