import { useState } from "react";
import Quiz from "./Quiz";

function App() {
  //react state hook for setting mode
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    
    } else {
      setMode("light");
    }
  };
  
  return (
    <>
      <Quiz mode={mode} toggleMode={toggleMode} />
    </>
  );
}

export default App;
