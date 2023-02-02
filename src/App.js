import { Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Join from './components/Join';
import "./index.css";
import { AuthProvider } from './context/AuthContext';
function App() {
 
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Join/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
