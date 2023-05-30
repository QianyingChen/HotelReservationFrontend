import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import {  Reservation, useCreateReservationMutation } from '../../api/reservationApi';
import { useAuth } from './useAuth';
import { useEffect, useState } from 'react';
import { Room } from '../../api/hotelApi';

type ReservationData = {
  room: Room;
  inDate: string;
  outDate: string;
  adultsCount: number;
  childrenCount: number;
};


export default function Reserve() {
  const location = useLocation();
  const navigate = useNavigate();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { room, inDate, outDate, adultsCount, childrenCount } = location.state as ReservationData;
  
  useEffect(() => {
    if (!location.state || !room || shouldRedirect) {
      navigate('/');
    }
  }, [location, navigate, room, shouldRedirect]);

  const checkInDate = new Date(inDate);
  const checkOutDate = new Date(outDate);

  const totalDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  const totalPrice = totalDays * room?.price;

  const { user } = useAuth();
  console.log(user)
  const [createReservation] = useCreateReservationMutation();

  const handleReservation = async (reservation: Reservation) => {
    try {
      console.log("User details "+user);
      await createReservation(reservation).unwrap();
      if (user) {
        navigate(`/users/${user.userId}`);
      }
    } catch (error) {
      console.error('Failed to reserve:', error);
    }
  };


  // const createReservationObject = (data: ReservationData): Reservation => ({
  //   id:50,
  //   checkInDate: data.inDate,
  //   checkOutDate: data.outDate,
  //   numGuests: data.adultsCount + data.childrenCount,
  //   bookingDate: new Date().toISOString(),
  //   totalPrice,
  //   reservationStatus: "Pending",
  //   roomId: room.roomId,
  //   userId: user?.userId || undefined,
  // });

  // const onConfirmReservation = () => {
  //   if (user) {
  //     const reservation = createReservationObject(location.state as ReservationData);
  //     handleReservation(reservation);
  //   } else {
  //     sessionStorage.setItem('pendingReservation', JSON.stringify(location.state));
  //     navigate('/users/signin', { state: { from: location.pathname } });
  //     setShouldRedirect(true);
  //   }
  // }

  const reservationObj ={
    id:50,
    checkInDate: inDate,
    checkOutDate: outDate,
    numGuests: adultsCount + childrenCount,
    totalPrice,
    reservationStatus: "comfirm",
    roomId: room.roomId,
    userId: user?.userId || undefined,
  }

  const onConfirmReservation = () => {

    //createReservation(reservationObj);
    if (user) {
      //const reservation = createReservation(reservationObj);
    
      handleReservation(reservationObj);
     
    } else {
      sessionStorage.setItem('pendingReservation', JSON.stringify(location.state));
      navigate('/users/signin', { state: { from: location.pathname } });
      setShouldRedirect(true);
    }
  }
  
  
  useEffect(() => {
    const pendingReservationItem = sessionStorage.getItem('pendingReservation');
    if (pendingReservationItem) {
      const pendingReservation = JSON.parse(pendingReservationItem);
      if (user && pendingReservation) {
        handleReservation(pendingReservation);
        sessionStorage.removeItem('pendingReservation');
      }
    }
  }, [user]);
  

  // const onConfirmReservation = () => {
  //   if (user) {
  //     const reservation = createReservationObject(location.state as ReservationData);
  //     handleReservation(reservation);
  //   } else {
  //     localStorage.setItem('pendingReservation', JSON.stringify(location.state));
  //     navigate('/users/signin', { state: { from: location.pathname } });
  //     setShouldRedirect(true);
  //   }
  // }

  // useEffect(() => {
  //   const pendingReservationItem = localStorage.getItem('pendingReservation');
  //   if (pendingReservationItem) {
  //     const pendingReservation = JSON.parse(pendingReservationItem);
  //     if (user && pendingReservation) {
  //       handleReservation(pendingReservation);
  //       localStorage.removeItem('pendingReservation');
  //     }
  //   }
  // }, [user]);


  return (
    <>
      <h1>Reserve page</h1>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '80%' }}>
          <CardMedia component="img" height="400" image={room.imageUrl} alt={room.roomType} />
          <Typography variant="h5" align="center" sx={{ marginTop: '20px' }}>
            <strong>Welcome to Grand Vista, here's your Booking details:</strong>
          </Typography>
          <CardContent>
            <Typography variant="h5" color="text.secondary">
              {room.roomType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {room.roomDescription}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check in: {inDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check out: {outDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Adults: {adultsCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Children: {childrenCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Price: {totalPrice}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={onConfirmReservation}>
              Confirm Reservation
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
