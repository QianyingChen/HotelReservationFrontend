import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate('/');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <h1>Oops!</h1>
      <h2>The page you are looking for does not exist.</h2>
      <p>It doesn't matter, you can search again or click the button below to continue browsing Grand Vista</p>
      <Button variant="contained" onClick={handleHomeButtonClick}>
        Go to Home Page 
      </Button>
    </Box>
  );
}

export default NotFoundPage;