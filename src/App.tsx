import { Navigate, Route} from "react-router";
import { Routes } from "react-router";
import Week from "./week";
import Login from "./login";


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
    <Routes>
      <Route path="app">
        <Route index element={weekRedirect()} />
        <Route path="*" element={weekRedirect()} />
        <Route path=":year/:month/:day" element={<Week />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
    </>
  )
}
export default App
