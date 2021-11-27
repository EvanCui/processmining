import React, { useState } from 'react';
import './Framework.css';
import NavigationBar from './NavigationBar';
import ProcessDiagnostics from '../pages/ProcessDiagnostics';
import { Box, AppBar, Toolbar, Typography, } from '@mui/material';
import RichAppBar from './RichAppBar';

export default function Framework() {
    const [currentPage, setCurrentPage] = useState(0);

    function onSelectedChanged(selectedIndex: number) {
        console.log("selected " + selectedIndex);
        setCurrentPage(selectedIndex);
    }

    const pages = [
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
        <ProcessDiagnostics />,
    ]

    return (
        <div id="Framework">
            <Box sx={{ display: 'flex' }}>
                <NavigationBar onSelectedChanged={onSelectedChanged} />
                <AppBar position="fixed">
                    <Toolbar>
                        {/* <RichAppBar /> */}
                        <Typography variant="h6" noWrap component="div">
                            Mini variant drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {pages[currentPage]}
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}