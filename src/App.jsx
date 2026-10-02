import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import Login from "./Login";
import Sighnup from "./Sighnup";
import Sighnin from "./Sighnin";
import Mainpage from './Mainpage';
import Airtimepage from './Airtimepage';
import Datapage from "./Datapage";
import Bankingpage from "./Bankingpage";
import Owner from "./Owner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<Login />} />
        <Route path="/signup" element={<Sighnup />} />
        <Route path="/signin" element={<Sighnin />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path="/airtime" element={<Airtimepage />} />
        <Route path="/data" element={<Datapage />} />
        <Route path="/bank" element={<Bankingpage/>} />
        <Route path="/owner" element={<Owner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;