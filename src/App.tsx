
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import HotelList from './pages/hotellist/HotelList'
import Hotel from './pages/hotel/Hotel'
import Navbar from './components/Navbar'
import SignUpPage from './pages/user/SignUpPage'
import SignInPage from './pages/user/SignInPage'
import Reserve from './pages/user/Reserve'
import UserComponent from './pages/user/UserComponent'
import { ReactNode } from 'react'





function App() {
 
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/hotels/' element={<HotelList/>}/>   
      <Route path='/hotels/:locationName' element={<HotelList/>}/> 
      <Route path='/hotels/:id/rooms' element={<Hotel/>}/>
   {/* need to change later */}
      <Route path='/users/:id' element={<UserComponent reservation={{
          map: function (): ReactNode {
            throw new Error('Function not implemented.')
          },
          id: undefined,
          checkInDate: '',
          checkOutDate: '',
          numGuests: 0,
          bookingDate: '',
          totalPrice: 0,
          reservationStatus: '',
          roomId: undefined,
          userId: undefined
        }} />}/>  

      <Route path='/rooms/:id/reserve' element={<Reserve/>}/>
      <Route  path="/users/signup" element={<SignUpPage/>} />
      <Route  path="/users/signin" element={<SignInPage/>} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App
