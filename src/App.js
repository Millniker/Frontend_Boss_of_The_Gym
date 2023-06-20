import './styles/custom.scss';
import './styles/styles.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
function App() {
  return (
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
  );
}

export default App;
// useEffect(()=>{
//     dispatch(login("front1233","Zz12345&"))
// },[])