import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Typography, CardActions, CardHeader, Button } from '@mui/material';
import {  Reservation, useCreateReservationMutation } from '../../api/reservationApi';
import { useAuth } from './useAuth';
import { ReactNode } from 'react';



export default function Reserve() {
  const roomDetails = useLocation();
  const roomSelected = roomDetails.state?.room;
  const reserveDetails = useLocation();
  const { inDate, outDate } = reserveDetails?.state;
  const adultsCount = reserveDetails?.state?.adultsCount;
  const childrenCount = reserveDetails?.state?.childrenCount;
   // Convert inDate and outDate to Date objects
   const checkInDate = new Date(inDate);
   const checkOutDate = new Date(outDate);
 
   //total number of days
   const totalDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
 
   //total price
   const totalPrice = totalDays * roomSelected.price;
   
   const navigate = useNavigate();


   const { user } = useAuth();
   const [createReservation] = useCreateReservationMutation();
 
   const handleReservation = async () => {
    if (user) {
      // Create reservation object
      const reservation: Reservation = {
        checkInDate: inDate,
        checkOutDate: outDate,
        numGuests: adultsCount + childrenCount,
        bookingDate: new Date().toISOString(),
        totalPrice,
        reservationStatus: "Pending",
        roomId: roomSelected.id,
        userId: user.userId,
        map: function (): ReactNode {           {/* need to change later */}
          throw new Error('Function not implemented.');
        }
      }
       
         
          try {
            await createReservation(reservation).unwrap();
            navigate('/users/:id'); 
          } catch (error) {
            console.error('Failed to reserve:', error);
          }
        } else {
          navigate('/users/signin');
        }
      }
   

 
   return (
     <>
       <h1>Reserve page</h1>
       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
         <Card sx={{ width: '80%' }}>
           <CardMedia component="img" height="400" image={roomSelected.imageUrl} alt={roomSelected.roomType} />
           <Typography variant="h5" align="center" sx={{ marginTop: '20px' }}>
             <strong>Wellcome to Grand Vista, here's your Booking details:</strong>
           </Typography>
           <CardContent>
             <CardHeader title={roomSelected.roomType} subheader={roomSelected.roomDescription} sx={{ textAlign: 'center' }} />
             <Typography variant="body1" fontWeight="bold" fontFamily="Helvetica" color="primary" component="div" sx={{ textAlign: 'center' }}>
               Total Price: ${totalPrice}
             </Typography>
             <Typography variant="body1" component="div" sx={{ textAlign: 'center' }}>
               Price per night: ${roomSelected.price}
             </Typography>
             <Typography variant="body1" fontWeight="bold" color="primary"  component="div" sx={{ marginTop: '10px', textAlign: 'center' }}>
               Total Number of Days: {totalDays}
             </Typography>
             <Typography variant="body1" component="div" color="textPrimary" sx={{ textAlign: 'center' }}>
               Check In Date: {inDate}
             </Typography>
             <Typography variant="body1" component="div" sx={{ textAlign: 'center' }}>
               Check Out Date: {outDate}
             </Typography>
             
             <Typography variant="body1" fontWeight="bold" color="primary" component="div" sx={{marginTop: '10px', textAlign: 'center' }}>
               Total number of guests: {adultsCount + childrenCount}
             </Typography>
             <Typography variant="body1" component="div" sx={{ textAlign: 'center' }}>
               Adults: {adultsCount}
             </Typography>
             <Typography variant="body1" component="div" sx={{ textAlign: 'center' }}>
               Children: {childrenCount}
             </Typography>
             
           </CardContent>
           <CardActions sx={{ justifyContent: 'center', marginBottom: '20px' }}>
           <Button variant="contained" color="primary" onClick={handleReservation}>Confirm Reservation</Button>
           </CardActions>
         </Card>
       </Box>
     </>
   );
 }
