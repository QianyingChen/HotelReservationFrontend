import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery, useUpdateUserMutation, User } from '../../api/userApi';
import { useGetReservationsByUserIdQuery, Reservation, useUpdateReservationMutation, useDeleteReservationMutation } from '../../api/reservationApi';
import { Button, TextField, Grid, Paper, Typography, CardActions, Card, CardContent } from '@mui/material';

const UserComponent = () => {
  const { id } = useParams<{ id: string }>();

  const { data: user, isError: userError } = useGetUserByIdQuery(Number(id));
  const { data: reservations } = useGetReservationsByUserIdQuery(Number(id));

  const [updateUser] = useUpdateUserMutation();
  const [updateReservation] = useUpdateReservationMutation();
  const [deleteReservation] = useDeleteReservationMutation();
  const [editReservation, setEditReservation] = useState<Reservation | null>(null);
  const [deleteReservationId, setDeleteReservationId] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  if (userError) {
    return <div>Error loading user</div>;
  }

  const handleUserUpdate = (newUserData: User) => {
    updateUser(newUserData);
    setEditUser(null);
  };

  const handleReservationUpdate = (newReservationData: Reservation) => {
    updateReservation(newReservationData);
    setEditReservation(null);
  };

  const handleReservationDelete = (reservationId: number) => {
    deleteReservation(reservationId);
    setDeleteReservationId(null);
  };

  useEffect(() => {
    if (deleteReservationId !== null) {
      handleReservationDelete(deleteReservationId);
    }
  }, [deleteReservationId]);

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

              <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                Booking Information
              </Typography>
              {reservations.map((reservation) => (
                <div key={reservation.id}>
                  {/* Reservation details */}
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

                  {/* Actions */}
                  {editReservation && reservation.id !== undefined && editReservation.id === reservation.id ? (
                    <form onSubmit={() => handleReservationUpdate(editReservation)}>
                      {/* Reservation update form */}
                      <TextField
                        value={editReservation.numGuests}
                        onChange={(e) => {
                          const newNumGuests = parseInt(e.target.value, 10);
                          if (newNumGuests <= 4) {
                            setEditReservation({ ...editReservation, numGuests: newNumGuests });
                          }
                        }}
                        label="Number of Guests"
                        type="number"
                        inputProps={{ min: 1, max: 4 }}
                        fullWidth
                      />
                      <Button type="submit">Update</Button>
                      <Button onClick={() => setEditReservation(null)}>Cancel</Button>
                    </form>
                  ) : (
                    <div>
                      <Button onClick={() => setEditReservation(reservation)}>Update Reservation</Button>
                      <Button onClick={() => setDeleteReservationId(reservation.id || null)}>Cancel Reservation</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserComponent;

