import React from "react";
import { Routes, Route } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";

function Router() {
  //Here, the appropriate component according to the link of the page is displayed on the screen.
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="detail/:characterId" element={<DetailPage />} />
    </Routes>
  )
}

export default Router;