import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from "./user/components/Layout";
import Home from "./user/page/Home";
import Notfound from "./components/Notfound";
function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Layout />}>
           <Route path="/" element={<Home/>} />
          </Route>

          <Route path="*" element={<Notfound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
