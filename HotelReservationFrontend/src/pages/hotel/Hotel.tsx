import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import {Grid,Card,CardMedia,CardContent,Typography,CardActionArea,CardActions,Button} from '@mui/material';
import { useGetAllRoomsInHotelQuery} from '../../api/hotelApi';

export default function Hotel(){
  
    const { id } = useParams();
    const {data:rooms}=useGetAllRoomsInHotelQuery(id);

    console.log(rooms);
   
    return(
        <>
        <h1>Hotel with Rooms Page {id}</h1>
        <Grid container spacing={2}>
        {rooms?.map((room) => (
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
              {room.roomType}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {room.roomDescription}
            </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
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