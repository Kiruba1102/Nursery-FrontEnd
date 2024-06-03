import React from 'react';
import { CssBaseline, Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Home, Dashboard, Settings, Logout } from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const drawerWidth = 240;

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap style={{fontSize:"28px"}}>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <a href='/adashboard'>
            <ListItem button key="Home">
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            </a>
           <a href='/'>
            <ListItem button key="Logout" >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout"  />
              
            </ListItem>
            </a>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 6,
          
          marginLeft: `100px`
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
          <Card sx={{ maxWidth: 345 }} style={{width:"340px"}}> 
            <CardMedia
              sx={{ height: 140 }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkBpgSGwIv6HLq46xw3YNe-ylvsSxTCkeviA&s"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" >
                Plants
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{fontSize:"18px"}}>
                Admin can add the plant
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" style={{fontSize:"15px"}}>Share</Button>
              <Button size="small" href='/product' style={{fontSize:"15px"}}>Addplant</Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }} style={{width:"340px"}}>
            <CardMedia
              sx={{ height: 140 }}
              image="data:image/jpeg;base64,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"
              title="customer"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Customer Details
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{fontSize:"18px"}}>
                Admin Can view the customer details
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" style={{fontSize:"15px"}}>Share</Button>
              <Button size="small" href='/customer' style={{fontSize:"15px"}}>View Customer </Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }} style={{width:"340px"}}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://t3.ftcdn.net/jpg/08/06/45/50/240_F_806455061_VgDRBZ93Gd57k98aCQl2LFFUNgWalVC3.jpg"
              title="customer"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
               Order Details
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{fontSize:"18px"}}>
                Admin Can view the Order details
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" style={{fontSize:"15px"}}>Share</Button>
              <Button size="small" href='/order' style={{fontSize:"15px"}}>View Orders </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
