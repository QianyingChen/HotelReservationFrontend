import { ChangeEvent, useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

export default function MultiActionAreaCard() {
  const [location, setLocation] = useState<string>("New York");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setter(value);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, boxShadow: 6 }} >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
            Find places to stay on Grand Vista
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover hotels and rooms perfect for any trip
          </Typography>

          <Grid container spacing={1} marginTop={4}>
            <Grid item xs={20} sm={12}>
              <TextField 
                label="Location" 
                variant="outlined" 
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField label="Check-in" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Check-out" variant="outlined" fullWidth />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                label="Adults" 
                variant="outlined" 
                fullWidth 
                type="number"
                value={adults}
                onChange={handleNumberChange(setAdults)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label="Children" 
                variant="outlined" 
                fullWidth 
                type="number"
                value={children}
                onChange={handleNumberChange(setChildren)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
         <Button 
            variant="contained" 
            size="large"
            // component={Link}
            // to={{
            //   pathname: '/search',
            //   state: { location, value, adults, children }
            // }}
          >
            Search
          </Button>
      </CardActions>
    </Card>
  );
}


