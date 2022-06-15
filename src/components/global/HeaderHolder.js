import React from "react";
import Header from "./Header";


function HeaderHolder({ children }) {
  return (
    <div>
      <Header />
      
      <div className="mt-24">{children}</div>
    </div>
  );
}

export default HeaderHolder;
