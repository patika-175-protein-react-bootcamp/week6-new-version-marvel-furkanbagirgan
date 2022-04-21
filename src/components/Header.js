import React from "react";

//Here, a component is created that combines the banner and logo.
const Header = () => (
  <div className="dp-flex">
      <img className="wd-100 banner" src="banner.png" alt=""/>
      <img id="logo" src="logo.png" alt=""/>
  </div>
)
export default Header;