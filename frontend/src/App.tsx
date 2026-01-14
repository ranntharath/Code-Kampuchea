import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { CoursePage } from "./pages/course/CoursePage";
import RootLayout from "./components/layouts/RootLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route path="/" element={<CoursePage/> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
