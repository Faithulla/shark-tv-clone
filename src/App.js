// import { useEffect, useState } from "react";
import React from "react";
import Basiclayout from "./components/Layout/BasicLayout";
// import Loadscreen from "./Pages/LoadScreen";

const App = () => {
  // const [load, setLoad] = useState(false);
  // useEffect(() => {
  //   setLoad(true);
  //   setTimeout(() => {
  //     setLoad(false);
  //   }, 2000);
  // }, []);
  return <div>
  {/* {load ? <Loadscreen /> :
   } */}
   <Basiclayout />
   
   </div>;
};

export default App;
