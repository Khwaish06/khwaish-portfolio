import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroVideo from "./components/IntroVideo";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("introPlayed");
  });

  const handleFinish = () => {
    sessionStorage.setItem("introPlayed", "true");
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroVideo onFinish={handleFinish} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}