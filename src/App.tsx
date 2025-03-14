import { Navigate, replace, Route} from "react-router";
import { Routes } from "react-router";
import Week from "./week";

function App() {

  function weekRedirect() {
    const today = new Date(Date.now());
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate() + 1;

    return (
    <>
    <Navigate to={`/week/${year}/${month}/${day}`} replace/>
    </>
    )
  }

  return (
    <>
    <Routes>
      <Route path="week">
        <Route index element={weekRedirect()} />
        <Route path="*" element={weekRedirect()} />
        <Route path=":year/:month/:day" element={<Week />} />
      </Route>
    </Routes>
    </>
  )
}
export default App
