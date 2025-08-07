import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ایمپورت صفحات
import { AuthProvider } from "./Context/AuthContext";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Tutors from "./pages/Tutors";
import MyClass from "./pages/MyClass";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import MainLayout from './Layouts/MainLayout'
import PlacementInfo from "./pages/PlacementInfo";
import PlacementTest from "./pages/PlacementTest";
import AssignedClasses from "./pages/AssignedClasses";


function App() {
  return (
    <AuthProvider>
<Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout> <Home /> </MainLayout>} />
        <Route path="/courses" element={<MainLayout> <Courses /></MainLayout>} />
        <Route path="/tutors" element={<MainLayout><Tutors /></MainLayout>} />
        <Route path="/MyClass" element={<MainLayout> <MyClass /></MainLayout>} />
        <Route path="/AssignedClasses" element={<MainLayout><AssignedClasses /></MainLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/placement" element={<MainLayout><PlacementInfo /></MainLayout>} />
<Route path="/placement/test" element={<PlacementTest/>}/>
      </Routes>
    </Router>
    </AuthProvider>
    
  );
}

export default App;