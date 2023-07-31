import LoginPage from './Components/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ViewExpenses from './Components/ViewExpensesHarika';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='/ViewExpenses' element={<ViewExpenses/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
