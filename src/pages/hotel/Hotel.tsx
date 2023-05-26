/**
 * This Page displays the selected hotel and its rooms
 */

import { Link,useParams,useLocation } from 'react-router-dom';
import {Grid,Card,CardMedia,CardContent,Typography,CardActions,Button,CardHeader} from '@mui/material';
import { useGetAllRoomsInHotelQuery,useGetAllAmenitiesInHotelQuery, Amenities, Room} from '../../api/hotelApi';

export default function Hotel(){
  
    const { id } = useParams();
    const {data:rooms}=useGetAllRoomsInHotelQuery(id);
    const{data:amenities}=useGetAllAmenitiesInHotelQuery(id);
    const hotelLocation = useLocation();
    const{checkInDate}=hotelLocation.state;
    const hotelSelected = hotelLocation.state?.hotel; 

    // const{hotelData,checkInDate}=hotelLocation.state;
    // const hotelSelected = hotelData.state?.hotel; 

    /** Get address of the selected hotel */
    const address=`${hotelSelected.streetName}, 
                    ${hotelSelected.phoneNumber}, ${hotelSelected.email}`;
    let address1;
                    {amenities?.map((amenity:Amenities) => (
                       address1=`${amenity.hotel.streetName},${amenity.hotel.location.city},${amenity.hotel.location.country},
                        ${amenity.hotel.postalCode},${amenity.hotel.phoneNumber},${amenity.hotel.email}`
                    ))}
        
   return(
        <>
        <h1>Hotel with Rooms Page {id}</h1>
      
        <Grid container spacing={2}>
         <Grid item xs={12} >
          <Card>
            <CardMedia
                  component="img"
                  height="300"
                  image={hotelSelected.imageUrl}
                  alt={hotelSelected.hotelName}
              />
             <CardHeader title={hotelSelected.hotelName} subheader={address1?address1:address}/>
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
          
        <Card >
        
           <CardMedia
            component="img"
            height="140"
            image={room.imageUrl}
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
                 
          <CardActions style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6"  component="div" >${room.price}</Typography> 
          <Link to={`/rooms/${room.roomId}/reserve`} state={{room,checkInDate}}  key={room.roomId}> 
                <Button  variant="contained" size="small">Reserve</Button>
          </Link>   
          </CardActions>
        </Card>
        
        </Grid>
         ))}
         </Grid>
        </>
    )
    }