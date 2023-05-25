// import Header from "../../components/Header"
import { Grid, Box } from '@mui/material';
import HomeCard from "../../components/HomeCard";


export default function Home(){
return(
    <>
     <Box sx={{ margin: '45px' }}> 
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <HomeCard />
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src="https://cp-project2-images.s3.amazonaws.com/hotels/home/home_hotel_1.jpg" alt="Hotel Image" style={{width: '100%', height: '100', borderRadius: '2%' }} />
        </Grid>
      </Grid>
    </Box>

    </>
)
}