import { Link, useMatch, useResolvedPath } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import  { useState } from "react";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import "./navbar.css"
import { Box, IconButton,  Menu, MenuItem } from "@mui/material";
//import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const {t,i18n}=useTranslation();

  return (
    <nav className='nav'>
          {/* Left - Logo */}
      <Link to='/' className='logo'>Grand Vista</Link>
      
      <ul>                  
          <CustomLink to='/hotels'>{t('Hotels')}</CustomLink> 
          <CustomLink to='/signup'>{t('Register')}</CustomLink>
          <CustomLink to='/signin'>{t('Sign in')}</CustomLink>

           {/* Right - Language options */}
           <Box display="flex" justifyContent="flex-end">

                <IconButton color="inherit"  onClick={handleMenuOpen}>
                  <LanguageIcon fontSize="medium"/>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={()=>i18n.changeLanguage('en')} >{t('English')}</MenuItem>
                  <MenuItem onClick={()=>i18n.changeLanguage('ta')}>{t('Tamil')}</MenuItem>
                  <MenuItem onClick={()=>i18n.changeLanguage('cn')}>{t('Chinese')}</MenuItem>
                </Menu>
              </Box>
      </ul>
    
  </nav>
)}

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
  [x: string]: any;   
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
