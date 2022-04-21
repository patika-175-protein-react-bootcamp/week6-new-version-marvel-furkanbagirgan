import React from "react";
import "../App.css";

import PropertyPanel from "./../components/PropertyPanel";
import Characters from "./../components/Characters";
import Footer from "./../components/Footer";

function HomePage() {
  //Here, the components of the first opened page are printed on the screen.
  return (
    <>
      <PropertyPanel isDetail={false}/>
      <Characters />
      <Footer />
    </>
  );
}

export default HomePage;
