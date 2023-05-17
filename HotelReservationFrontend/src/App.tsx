
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import HotelList from './pages/hotellist/HotelList'
import Hotel from './pages/hotel/Hotel'
import User from './pages/user/User'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hotels' element={<HotelList/>}/>  
      <Route path='/hotels/:id' element={<Hotel/>}/>
      <Route path='/users/:id' element={<User/>}/>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
