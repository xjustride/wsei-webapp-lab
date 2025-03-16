import React from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <CssBaseline />
            <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
                <Toolbar>
                    <Typography variant="h6" className="flex-grow">
                        Project Manager Application
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container className="mt-4">
                {children}
            </Container>
        </div>
    );
};

export default Layout;