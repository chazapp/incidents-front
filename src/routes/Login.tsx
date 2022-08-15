import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";
import { getCsrfToken } from "../utils";

function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                marginBottom: "10%"
            }}>
                <img style={{width: "50%", height: "auto"}} src="/logo.png" alt="Logo" />
            </Box>
            <Typography>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
            }}>
                <TextField
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    data-cy="login-email"
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    data-cy="login-password"

                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                    getCsrfToken().then((csrfToken) => {    
                            axios.post("/auth/", {
                                "username": email,
                                password,
                            }, {
                                headers: {
                                    "X-CSRFToken": csrfToken, 
                                }
                            }).then((response) => {
                                navigate("/")
                            }).catch((err) => {    
                                if (err.response.status === 400) {
                                    setError("Invalid email or password");
                                }
                            });
                        });
                    }}
                    data-cy="login-submit"
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
}

function Login() {
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get("/auth/").then((response) => {
            if (response.status === 200) {
                navigate("/");
            }
        }).catch((err) => {
        });
    });

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
        }}>
            <Box aria-label="login-panel" sx={{
                display: "flex",
                width: "25vw",
                height: "100vh",
            }}>
                <LoginForm />
            </Box>
            <Box aria-label="login-background" sx={{
                display: "flex",
                width: "75vw",
                height: "100vh",
            }}>
                <img style={{maxWidth: "100%"}} src="/login-background.jpg" alt="login-background" />
            </Box>
        </Box>
    );
}

export default Login;