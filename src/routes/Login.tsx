import React, {} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
function LoginForm() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
        }}>
            <Box></Box>
            <Typography>Login</Typography>
            <TextField label="Email" />
            <TextField label="Password" />
            <Button>Login</Button>
        </Box>
    );
}

function Login() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
        }}>
            <Box aria-label="login-panel" sx={{
                display: "flex",
                width: "30vw",
                height: "100vh",
                backgroundColor: "white",
            }}>
                <LoginForm />
            </Box>
            <Box aria-label="login-background" sx={{
                display: "flex",
                fill: "black",
                height: "100vh",
            }}>
                <img src="https://source.unsplash.com/collection/190727/1600x900" alt="login-background" />
            </Box>
        </Box>
    );
}

export default Login;