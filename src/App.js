import './App.css';
import Application from './components/Application';
import { BrowserRouter ,Route, Routes} from 'react-router-dom';
import Home from './Home';
import ToDo from './features/ToDo/toDo';
import EditToDo from './features/ToDo/EdittoDo';

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
       <Routes>
       <Route path="/" element={<Home/>}/><Route/>
       <Route path="/Application" element={<Application/>}/><Route/>
       <Route path="/toDo" element={<ToDo/>}/><Route/>
       <Route path="/EdittoDo/:id" element={<EditToDo/>}/><Route/>
       </Routes>
      </BrowserRouter>

      </div>
  );
}

export default App;
