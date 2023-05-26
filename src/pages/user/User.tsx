import { useLocation } from 'react-router-dom';

import {Grid,Card,CardMedia,CardContent,Typography,CardHeader, Box} from '@mui/material';


export default function User(){

    const roomDetails = useLocation();
    // const {roomDetails, reservationDate}  = useLocation();

    const roomSelected = roomDetails.state?.room;

    // const reservationDate = useLocation();
    // const DateSelected = reservationDate.state?.myFormData;
 
    

console.log(roomSelected);

console.log(roomSelected.price);

console.log(roomSelected.roomType);

console.log(roomSelected.roomDescription);

// console.log(DateSelected);


    return(
        <>
        <h1>User page</h1>
        <Box sx={{ margin: '45px' }}> 
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} >
              <Card>
                <CardMedia
                    component="img"
                    height="400"
                    image={roomSelected.imageUrl}
                    alt={roomSelected.roomType}
                />
                <CardHeader title={roomSelected.roomType} subheader={roomSelected.roomDescription}/>
                {/* <CardHeader title={roomSelected.checkInDate} subheader={roomSelected.checkInDate}/> */}
                <CardContent   >
                <Typography variant="h6"  component="div" >${roomSelected.price}</Typography>              
               </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        </>
    )
    }