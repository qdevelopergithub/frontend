import AddNewMovie from './components/addNewMovie/AddNewMovie';
import EditfFrom from './components/editSection/EditfFrom';
import MovieList from './components/homeSectin/MovieList';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movieList" element={<MovieList movie={[]} />} />
        <Route path="/addMovie" element={<AddNewMovie />} />
        <Route path="/editMovie" element={<EditfFrom />} />
             
      </Routes>
    </BrowserRouter>
  );
};

export default App;
