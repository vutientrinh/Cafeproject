import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManagerPage from "./pages/manager/ManagerPage";
import SignIn from "./pages/login/SignIn";
import NavBar from './components/NavBar';
import StaffPage from './pages/staff/StaffPage'
import VisitPage from './pages/VisitPage'
import Home from './pages/manager/Home';
import DashBoard from './pages/manager/DashBoard';
import PageNotFound from './components/404page/404';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/manager/*" element={<ManagerPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/" element={<SignIn />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
