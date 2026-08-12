import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './layout/Dashboard';
import Home from './pages/Home';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} >
          <Route index element={<Home />} />
          <Route path='/students' element={<Students />} />
          <Route path='/add-student' element={<AddStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
