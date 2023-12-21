import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Todo from './features/todo/Todo'
import Layout from './components/structure/Layout';
import Public from './components/Public'
import RequiresAuth from './features/RequiresAuth';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}></Route>
      {/* PUBLIC ROUTES */}
      <Route index element={<Public />} />
      <Route path='login' element={<Login />} />
      
      {/* PROTECTED ROUTES */}
      <Route element={<RequiresAuth />} >
        <Route path="dashboard"  element={<Todo />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
