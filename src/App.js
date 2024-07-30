import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./user/components/Layout";
import Home from "./user/page/Home";
import Notfound from "./components/Notfound";
import Auth from "./Auth/pages/Auth";
import Devlayout from "./user/components/Devlayout";
import DashHome from "./user/page/DashHome";
function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Layout />}>
           <Route path="/" element={<Home/>} />
          </Route>

          <Route path="/dashboard" element={<Devlayout/>}>
            <Route path="/dashboard" element={<DashHome/>} />
          </Route>


          <Route path="*" element={<Notfound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
