import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/course/CoursePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import CourseDetail from "./pages/course/CourseDetail";
import LearnCourse from "./pages/course/LearnCourse";
import OtpPage from "./pages/auth/OtpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route  path="/verify-otp" element={<OtpPage/>} />

        {/* user routes */}
        <Route path="/" element={<RootLayout/>}>
          <Route path="/" element={<HomePage/> }/>
          <Route path="/course" element={<CoursePage/> }/>
          <Route path="/about" element={<AboutPage/> }/>
          <Route path="/contact" element={<ContactPage/> }/>
          <Route path="/course/:id" element={<CourseDetail/> }  />
          <Route path="/course/:id/learn" element={<LearnCourse/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
