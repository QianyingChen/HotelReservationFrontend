
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import HotelList from './pages/hotellist/HotelList'
import Hotel from './pages/hotel/Hotel'
import User from './pages/user/User'
import Navbar from './components/Navbar'
import SignUpPage from './pages/user/SignUpPage'

function App() {
 

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hotels/' element={<HotelList/>}/>   
      <Route path='/hotels/:locationName' element={<HotelList/>}/> 
      <Route path='/hotels/:id/rooms' element={<Hotel/>}/>
      <Route path='/users/:id' element={<User/>}/>
      <Route path='/rooms/:id/reserve' element={<User/>}/>
      <Route  path="/users/signup" element={<SignUpPage/>} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App
