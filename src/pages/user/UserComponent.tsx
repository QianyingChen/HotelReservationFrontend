import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetUserByIdQuery, useUpdateUserMutation, User } from '../../api/userApi';
import { useGetReservationsByUserIdQuery, Reservation,  useCreateReservationMutation, useDeleteReservationMutation} from '../../api/reservationApi';
import { Button, TextField, Grid, Paper, Typography, CardActions, Card, CardContent, Box, CardMedia } from '@mui/material';
import { Room } from "../../api/hotelApi";

type ReservationData = {
    room: Room;
    inDate: string;
    outDate: string;
    adultsCount: number;
    childrenCount: number;
    response:any;
  };

// const UserComponent: React.FC<{ reservation: Reservation }> = () => {
    const UserComponent = () => {
  const { id } = useParams<{ id: string }>();
//   const [ setEditReservation] = useState<Reservation | null>(null);

  const { data: user, isError: userError } = useGetUserByIdQuery(Number(id));
  const { data: reservations} = useGetReservationsByUserIdQuery(Number(id));

  const [updateUser] = useUpdateUserMutation();
//   const [updateReservation] = useUpdateReservationMutation();
  const [createReservation] = useCreateReservationMutation();
  const [deleteReservation] = useDeleteReservationMutation();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { room, inDate, outDate, adultsCount, childrenCount, response } = (location.state as ReservationData) || {};
  // const { room, inDate, outDate, adultsCount, childrenCount, response } = location.state as ReservationData;
//   console.log(response);
  console.log(shouldRedirect);

  const checkInDate = new Date(inDate);
  const checkOutDate = new Date(outDate);
  const totalDays = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = totalDays * room?.price;


  if (userError) {
    return <div>Error loading user</div>;
  }

  const handleUserUpdate = (newUserData: User) => {
    updateUser(newUserData);
    setEditUser(null);
  };

  const handleReservation = async (reservation: Reservation) => {
    try {
      console.log("User details "+ user);
      await createReservation(reservation).unwrap();
      if (user) {
        navigate(`/users/${user.userId}`, {state:{ room, inDate, outDate, adultsCount, childrenCount ,response}});
      }
    } catch (error) {
      console.error('Failed to reserve:', error);
    }
  };

// const handleReservation = async (reservation: Reservation, isNew: boolean) => {
//     try {
//       console.log("User details "+ user);
//       if (isNew) {
//         await createReservation(reservation).unwrap();
//       } else {
//         await updateReservation(reservation).unwrap();
//       }
//       if (user) {
//         navigate(`/users/${user.userId}`, {state:{ room, inDate, outDate, adultsCount, childrenCount ,response}});
//       }
//     } catch (error) {
//       console.error('Failed to reserve:', error);
//     }
// };



  const reservationObj ={
    id:50,
    checkInDate: inDate,
    checkOutDate: outDate,
    numGuests: adultsCount + childrenCount,
    totalPrice,
    reservationStatus: "comfirm",
    roomId: room?.roomId || 0,
    userId: user?.userId || 0,
    // roomId: room.roomId,
    // userId: user?.userId || undefined,
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
  const handleReservationCancel = async (reservation: Reservation) => {
    try {
      await deleteReservation(reservation.id || 0).unwrap();
      if (user) {
      navigate(`/users/${user.userId}`, {state:{ room, inDate, outDate, adultsCount, childrenCount ,response}});
      }
    } catch (error) {
      console.error('Failed to cancel reservation:', error);
    }
  };

//   const handleReservationUpdate = async (reservation: Reservation) => {
//     try {
//       await updateReservation(reservation).unwrap();
//       if (user) {
//         navigate(`/users/${user.userId}`, {state:{ room, inDate, outDate, adultsCount, childrenCount ,response}});
//       }
//     } catch (error) {
//       console.error('Failed to update reservation:', error);
//     }
// };


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
  

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={6}>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
          <Typography variant="h4" gutterBottom>
            User Information
          </Typography>
          {user && reservations && (
            <div>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Username: {user.username}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    First Name: {user.firstName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Last Name: {user.lastName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Phone Number: {user.phoneNumber}
                  </Typography>
                </CardContent>
                <CardActions>
                  {editUser ? (
                    <form onSubmit={() => handleUserUpdate(editUser)}>
                      <TextField
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        label="Email"
                        fullWidth
                      />
                      <TextField
                        value={editUser.phoneNumber}
                        onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })}
                        label="Phone Number"
                        fullWidth
                      />
                      <Button type="submit">Update</Button>
                      <Button onClick={() => setEditUser(null)}>Cancel</Button>
                    </form>
                  ) : (
                    <Button onClick={() => setEditUser(user)}>Edit</Button>
                  )}
                </CardActions>
              </Card>

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

              <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                Booking Information
              </Typography>
              {reservations?.map((reservation:Reservation) => (
                <div key={reservation.id}>
                  <Typography variant="body1" gutterBottom>
                    Reservation ID: {reservation.id}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Check-in Date: {reservation.checkInDate}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Check-out Date: {reservation.checkOutDate}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Number of Guests: {reservation.numGuests}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Total Price: {reservation.totalPrice}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Reservation Status: {reservation.reservationStatus}
                  </Typography>
                  <Button onClick={() => handleReservationCancel(reservation)}>Cancel Reservation</Button>
                  {/* <Button onClick={() => setEditReservation(reservation)}>Update Reservation</Button> */}
                </div>
              ))}

              
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserComponent;



