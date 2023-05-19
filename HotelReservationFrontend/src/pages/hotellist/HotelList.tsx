import { Link } from 'react-router-dom';
import {Grid,Card,CardMedia,CardContent,Typography,CardActionArea} from '@mui/material';
import {  useGetHotelsByLocationQuery } from '../../api/hotelApi';


export default function HotelList(){

 const {data:hotels}=useGetHotelsByLocationQuery("paris");
   return(
        <>
        <h1>Hotels List Page1</h1>
      
        <Grid container spacing={4}>
        {hotels?.map((hotel) => (
        <Grid item xs={12} sm={4} key={hotel.hotelId}>
          <Link to={`/hotels/${hotel.hotelId}`} state={{ hotel }} key={hotel.hotelId}>
        <Card >
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
            <Typography variant="body2" color="text.secondary">
              {hotel.description}
            </Typography>
            </CardContent>
          </CardActionArea>
          
        </Card>
        </Link>
        </Grid>
        ))}
       
      </Grid>
     
        </>
    )
    }

    