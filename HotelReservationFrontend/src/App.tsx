
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import HotelList from './pages/hotellist/HotelList'
import Hotel from './pages/hotel/Hotel'
import User from './pages/user/User'
import Navbar from './components/Navbar'

function App() {
 

  return (
    <BrowserRouter>
      <Navbar />
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
