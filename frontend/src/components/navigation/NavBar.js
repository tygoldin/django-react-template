import {useState} from "react";

import '../../styles/NavBar.css';

import { useTheme } from '@mui/material/styles';

import { Link } from "react-router-dom";

import {
    Avatar, Box, Button, Collapse, IconButton, ListItemButton,
    Menu, MenuItem, Toolbar, Tooltip, Typography, List, Divider,
    CssBaseline, Drawer, ListItemText,
} from "@mui/material";
import {ChevronRight as ChevronRightIcon,
        ChevronLeft as ChevronLeftIcon,
        Menu as MenuIcon,
        Search as SearchIcon,
        ExpandLess,
        ExpandMore} from "@mui/icons-material";

import {navLinks} from "../../api/navConstants";
// from https://mui.com/components/app-bar/ and https://mui.com/components/drawers/
import {MuiAppBar, Main, Search, SearchIconWrapper,
        DrawerHeader, StyledInputBase, drawerWidth} from "../material-ui/MuiNavBar";

export function NavBar(props) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <MuiAppBar position="fixed" open={open}>
                <Toolbar className="toolbar">
                    {/* smaller navbar when minimized */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, height: "64px"}}>
                        {!open &&
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerOpen}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>}
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link to="" style={{ textDecoration: 'none', color: "white" }}>
                            LOGO
                        </Link>
                    </Typography>
                    {/* bigger navbar when not minimized */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', alignItems: "center" }, height: "64px" }}>
                        {!open && <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerOpen}
                            color="inherit"
                            sx={{mr: 3}}
                        >
                            <MenuIcon />
                        </IconButton>}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{mr: 2}}
                        >
                            <Link to="" style={{ textDecoration: 'none', color: "white" }}>
                                LOGO
                            </Link>
                        </Typography>
                        {navLinks.map((link) => (
                            <Button
                                key={link.name}
                                onClick={() => {}}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to={link.url} style={{ textDecoration: 'none', color: "white" }}>
                                    {link.name}
                                </Link>
                            </Button>
                        ))}
                        <Box sx={{marginLeft: "auto", paddingRight: "15px"}}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Box>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings" arrow>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Ty" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            anchorEl={anchorElUser}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {props.settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </MuiAppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {navLinks.map((link) => {
                        return <NestedList name={link.name}
                                           children={link.children}
                                           url={link.url}
                                           key={link.name}/>
                    })}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {props.children}
            </Main>
        </Box>
    )

}

function NestedList(props) {
    const [open, setOpen] = useState(false);

    function handleClick () {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={props.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.children.map((link) => {
                        return <Link to={props.url + link.url}
                                     style={{ textDecoration: 'none', color: "black" }}
                                     key={props.url + link.url}>
                                   <ListItemButton sx={{ pl: 4 }}
                                                   key={link.name}>
                                       <ListItemText primary={link.name} />
                                   </ListItemButton>
                               </Link>
                    })}
                </List>
            </Collapse>
        </>
    )
}