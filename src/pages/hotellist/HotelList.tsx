import { useState,useEffect } from 'react';
import { Link,useLocation,useParams } from 'react-router-dom';
import { Grid,Card,CardMedia,CardContent,Typography,CardActionArea, Alert, Tooltip,Fade } from '@mui/material';
import { Hotel, useGetHotelsByLocationQuery } from '../../api/hotelApi';

export default function HotelList(){
  const { locationName } = useParams();
  const {data:hotels} = useGetHotelsByLocationQuery(locationName as string);

  const myFormData  = useLocation()?.state;
  console.log(myFormData?.state);



  const [currentlyNotAvailable ,setCurrentlyNotAvailable]=useState<JSX.Element | null>(null);


  useEffect(() => {
    if (locationName == null||hotels == null) {
      setCurrentlyNotAvailable(
      <Alert severity="info">We are currently offering hotels in the following locations..</Alert>
        );
    }
  }, [locationName]);


  return(
        <>
        {/* <h1>Hotels List Page1</h1> */}
       
        <h6>{currentlyNotAvailable}</h6>
        <Grid container spacing={4}>
        {hotels?.map((hotel: Hotel) => (
        <Grid item xs={12} sm={4} key={hotel.hotelId}>
          <Link to={`/hotels/${hotel.hotelId}/rooms`} state={{ hotel , ...myFormData}} key={hotel.hotelId}>
        <Card >
        <Tooltip TransitionComponent={Fade} title={hotel.description}>
          <CardActionArea>
           <CardMedia
            component="img"
            height="140"
            image={hotel.imageUrl}
            alt={hotel.hotelName}
          />
          <CardContent>
           
            <Typography variant="h5" component="div">
              {hotel.hotelName}
            </Typography>
                   
            </CardContent>
          </CardActionArea>
          </Tooltip>
        </Card>
        </Link>
        </Grid>
        ))}      
      </Grid>
     
        </>
    )
    }


    