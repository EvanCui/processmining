import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Badge } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material'
import { Mail as MailIcon, Notifications as NotificationsIcon } from '@mui/icons-material'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '500px',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function RichAppBar() {
    return (
        <AppBar position='static'>
            <Toolbar variant="dense">
                <IconButton size="small" edge="start" color="inherit" aria-label="Open Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="subtitle1" noWrap component="div">
                    Process Mining
                </Typography>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search ..." inputProps={{ 'aria-label': 'search' }} />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton size="large" aria-label="show mails" color="inherit">
                        <Badge badgeContent="4" color="error">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" aria-label="show notifications" color="inherit">
                        <Badge badgeContent="7" color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton size="large" edge="end" aria-label="my account" color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}