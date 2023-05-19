
import { Link,useParams,useLocation } from 'react-router-dom';
import {Grid,Card,CardMedia,CardContent,Typography,CardActionArea,CardActions,Button,CardHeader} from '@mui/material';
import { useGetAllRoomsInHotelQuery,useGetAllAmenitiesInHotelQuery, Amenities, Room} from '../../api/hotelApi';

export default function Hotel(){
  
    const { id } = useParams();
    const {data:rooms}=useGetAllRoomsInHotelQuery(id);
    const{data:amenities}=useGetAllAmenitiesInHotelQuery(id);
    const hotelLocation = useLocation();
    const hotel1 = hotelLocation.state?.hotel;

    const address=`${hotel1.streetName}, ${hotel1.postalCode}, 
                    ${hotel1.phoneNumber}, ${hotel1.email}`;
   let address1;
                    {amenities?.map((amenity:Amenities) => (
                       address1=`${amenity.hotel.streetName},${amenity.hotel.location.city},${amenity.hotel.location.country},
                        ${amenity.hotel.postalCode},${amenity.hotel.phoneNumber},${amenity.hotel.email}`
                    ))}
                    console.log(address1);
  //  const address=`${hotel.streetName},${location.city},${location.country}, ${hotel.postalCode}, 
  //            ${hotel.phoneNumber}, ${hotel.email}`;
   
   return(
        <>
        <h1>Hotel with Rooms Page {id}</h1>
      
        <Grid container spacing={2}>
           <Grid item xs={12} >
          <Card>
            
              <CardMedia
                  component="img"
                  height="300"
                  image={hotel1.imageUrl}
                  alt={hotel1.hotelName}
              />
             <CardHeader title={hotel1.hotelName} subheader={address1}/>
             <CardContent   >
             <Typography variant='h6' style={{ textAlign: 'left' , marginBottom: '1rem' }} >
          Popular amenities
        </Typography>
        <Grid container spacing={2} >
          {amenities?.map((amenity:Amenities) => (
            <Grid item xs={6} key={amenity.amenitiesId}>
              <Typography style={{ textAlign: 'left'}}  variant="body2" color="text.secondary"> * {amenity.amenitiesType}</Typography>
            </Grid>
          ))}
        </Grid>
             
             </CardContent>
             </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                Choose Your Room
              </Typography>
            </Grid>
               {rooms?.map((room:Room) => (
        <Grid item xs={12} sm={4} key={room.roomId}>
          <Link to={`/rooms/${room.roomId}/reserve`} key={room.roomId}> 
        <Card >
          <CardActionArea>
           <CardMedia
            component="img"
            height="140"
            image='https://cp-project2-images.s3.amazonaws.com/hotels/Langham/rooms/double+room.jpg'
            alt={room.roomType}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {room.roomType} Room
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {room.roomDescription}
            </Typography>
            </CardContent>
          </CardActionArea>
          
          <CardActions style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6"  component="div" >${room.price}</Typography> 
                <Button  variant="contained" size="small">Reserve</Button>
                
          </CardActions>
        </Card>
        </Link>
        </Grid>
         ))}
         </Grid>
        </>
    )
    }