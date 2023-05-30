
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import HotelList from './pages/hotellist/HotelList'
import Hotel from './pages/hotel/Hotel'
import Navbar from './components/Navbar'
import SignUpPage from './pages/user/SignUpPage'
import SignInPage from './pages/user/SignInPage'
import Reserve from './pages/user/Reserve'
import UserComponent from './pages/user/UserBooking'
import NotFoundPage from './pages/NotFoundPage'
import UserPage from './pages/user/UserPage'





function App() {
 
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hotels/' element={<HotelList/>}/>   
      <Route path='/hotels/:locationName' element={<HotelList/>}/> 
      <Route path='/hotels/:id/rooms' element={<Hotel/>}/>
      <Route path='/users/:id' element={<UserComponent />} />
      <Route path='/users/:id/details' element={<UserPage />} />
      <Route path='/rooms/:id/reserve' element={<Reserve/>}/>
      <Route  path="/signup" element={<SignUpPage/>} />
      <Route  path="/signin" element={<SignInPage/>} />
      <Route  path="/users/signup" element={<SignUpPage/>} />
      <Route  path="/users/signin" element={<SignInPage/>} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App
