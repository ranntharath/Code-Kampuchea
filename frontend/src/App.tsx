import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/course/CoursePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route path="/" element={<HomePage/> }/>
          <Route path="/course" element={<CoursePage/> }/>
          <Route path="/about" element={<AboutPage/> }/>
          <Route path="/contact" element={<ContactPage/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
