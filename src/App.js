import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./user/components/Layout";
import Home from "./user/page/Home";
import Notfound from "./components/Notfound";
import Auth from "./Auth/pages/Auth";
import Devlayout from "./user/components/Devlayout";
import DashHome from "./user/page/DashHome";
import WorkListing from "./user/page/WorkListing";
import Reminderading from "./user/page/Reminderading";
import Classtimetable from "./user/page/Classtimetable";
import Portfolio from "./user/page/Portfolio";
import Gemini from "./user/page/Gemini";
import Login from "./Auth/pages/AuthLogin";


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Layout />}>
           <Route path="/" element={<Home/>} />
          </Route>

          <Route path="/auth/register" element={<Auth/>} />
          <Route path="/auth/login" element={<Login/>} />

          <Route path="/dashboard" element={<Devlayout/>}>
            <Route path="/dashboard" element={<DashHome/>} />
            <Route path="/dashboard/worklist" element={<WorkListing/>} />
            <Route path="/dashboard/reminder" element={<Reminderading/>} />
            <Route path="/dashboard/classtimetable" element={<Classtimetable/>} />
            <Route path="/dashboard/portfolio" element={<Portfolio/>} />
            <Route path="/dashboard/gemini" element={<Gemini/>} />

          </Route>


          <Route path="*" element={<Notfound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
