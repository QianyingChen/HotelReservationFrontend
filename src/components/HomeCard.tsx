import { ChangeEvent, useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
//import User from '../pages/user/Reseve';
import { useTranslation } from 'react-i18next';




export default function MultiActionAreaCard() {
  const [locationName, setLocationName] = useState<string>("New York");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  // Get today's date
  const today = new Date();

  // Calculate the check-out date as one week later
  const oneWeekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Initialize the check-in and check-out dates using useState hook
  const [checkInDate, setCheckInDate] = useState(today.toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(oneWeekLater);

  // Event handler for check-in date change
  const handleCheckInDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);

    // Check if the selected date is not a previous date
    if (selectedDate >= today) {
      setCheckInDate(event.target.value);

      // Calculate the new check-out date as one week later
      if (selectedDate <= new Date(checkOutDate)) {
        setCheckOutDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      }
    }
  };

  // Event handler for check-out date change
  const handleCheckOutDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);

    // Check if the selected date is not a previous date and is later than the check-in date
    if (selectedDate >= new Date(checkInDate)) {
      setCheckOutDate(event.target.value);
    }
  };


  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setter(value);
    }
  };

  const myFormData  = {
    inDate:"hello",
    outDate:checkOutDate,
    adultsCount:adults,
  }

  const {t}=useTranslation();

  return (
    <Card sx={{ maxWidth: 500, boxShadow: 6 }} >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
           {t('Find places to stay on Grand Vista')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
           {t('Discover hotels and rooms perfect for any trip')}
          </Typography>

          <Grid container spacing={1} marginTop={4}>
            <Grid item xs={20} sm={12}>
              <TextField 
                label={t('Location')} 
                variant="outlined" 
                fullWidth
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
             <TextField
                label={t('Check-in')}
                type="date"
                variant="outlined"
                fullWidth
                value={checkInDate}
                onChange={handleCheckInDateChange}
                inputProps={{ min: today.toISOString().split('T')[0] }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('Check-out')}
                type="date"
                variant="outlined"
                fullWidth
                value={checkOutDate}
                onChange={handleCheckOutDateChange}
                inputProps={{ min: checkInDate }}
              />
             </Grid>

            <Grid item xs={12} sm={6}>
              <TextField 
                label={t('Adults')}
                variant="outlined" 
                fullWidth 
                type="number"
                value={adults}
                onChange={handleNumberChange(setAdults)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField 
                label={t('Children')}  
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
      <Link  to={`/hotels/${locationName}`} state={{myFormData}} >
        <Button 
            variant="contained" 
            size="large"
          >
            {t('Search')} 
          </Button>
          </Link>
      </CardActions>
    </Card>
  );
}


