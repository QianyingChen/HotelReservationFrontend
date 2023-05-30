import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery, useUpdateUserMutation,User } from "../../api/userApi";
import { useGetReservationsByUserIdQuery, useUpdateReservationMutation, Reservation } from "../../api/reservationApi";
import { Button, TextField, Grid, Paper } from "@mui/material";


const UserDisplay = function UserDisplay({
  userData,
  onEdit,
  reservations,
  onConfirmReservation,
  onCancelReservation,
}: {
  userData: User;
  onEdit: () => void;
  reservations: Reservation[];
  onConfirmReservation: (reservation: Reservation) => void;
  onCancelReservation: (reservation: Reservation) => void;
}) {
  return (
    <div>
      <p>
        Name: {userData.firstName} {userData.lastName}
      </p>
      <p>Email: {userData.email}</p>
      <Button onClick={onEdit}>Edit</Button>


      <h2>Booking Information</h2>
      {reservations.map((reservation: Reservation) => (
        <div key={reservation.id}>
          <p>Reservation ID: {reservation.id}</p>
          <p>Check-in Date: {reservation.checkInDate}</p>
          <p>Check-out Date: {reservation.checkOutDate}</p>
          <p>Number of Guests: {reservation.numGuests}</p>
          <p>Total Price: {reservation.totalPrice}</p>
          <p>Reservation Status: {reservation.reservationStatus}</p>
          {reservation.reservationStatus === "Pending" && (
            <Button onClick={() => onConfirmReservation(reservation)}>
              Confirm
            </Button>
          )}
          {(reservation.reservationStatus === "Pending" ||
            reservation.reservationStatus === "Confirmed") && (
            <Button onClick={() => onCancelReservation(reservation)}>
              Cancel
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};


// UserEditForm component
const UserEditForm = function UserEditForm({
  userData,
  onSubmit,
}: {
  userData: User;
  onSubmit: (newUserData: User) => void;
}) {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...userData, firstName, lastName, email });
  };


  return (
    <form onSubmit={handleSubmit}>
      <TextField
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        label="First Name"
      />
      <TextField
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        label="Last Name"
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
      />
      <Button type="submit">Update</Button>
    </form>
  );
};




// UserComponent
export default function UserPage() {
  const { id } = useParams<{ id: string }>();


  const { data: user, isError: userError } = useGetUserByIdQuery(Number(id));
  const { data: reservations, isError: reservationsError } = useGetReservationsByUserIdQuery(Number(id));


  const [updateUser] = useUpdateUserMutation();
  const [updateReservation] = useUpdateReservationMutation();



  const [editUser, setEditUser] = useState<User | null>(null);
//   const [setEditReservation] = useState<Reservation | null>(null);


  if (userError || reservationsError) {
    return <div>Error loading user or reservations</div>;
  }


  const handleUserUpdate = (newUserData: User) => {
    updateUser(newUserData);
    setEditUser(null);
  };


//   const handleReservationUpdate = (newReservationData: Reservation) => {
//     updateReservation(newReservationData);
//     setEditReservation(null);
//   };


  const handleConfirmReservation = (reservation: Reservation) => {
    updateReservation({ ...reservation, reservationStatus: "Confirmed" });
  };


  const handleCancelReservation = (reservation: Reservation) => {
    updateReservation({ ...reservation, reservationStatus: "Cancelled" });
  };


  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper elevation={3}>
          <h2>User Information</h2>
          {user && reservations && (
            <UserDisplay
              userData={user}
              onEdit={() => setEditUser(user)}
              reservations={reservations}
              onConfirmReservation={handleConfirmReservation}
              onCancelReservation={handleCancelReservation}
            />
          )}
          {editUser && (
            <UserEditForm userData={editUser} onSubmit={handleUserUpdate} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}





