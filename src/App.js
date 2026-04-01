import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Docs from "./pages/Docs";
import UrlForm from "./component/urlform";
import ImageUpload from "./component/ImageUpload";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docs" element={<Docs />} />
          <Route
            path="/shorten"
            element={
              <div className="centered-page">
                <UrlForm />
              </div>
            }
          />
          <Route
            path="/imageupload"
            element={
              <div className="centered-page">
                <ImageUpload />
              </div>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
