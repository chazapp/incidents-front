import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Incident } from "../interfaces";


function IncidentCard(props: { incident: Incident }) {
    const { incident } = props;
    return (
        <Paper sx={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "column",
        }}>
            <Box aria-label="incident-header" sx={{
                display: "flex",
                padding: "1rem",
            }}>
                <Typography variant="h5">{incident.title}</Typography>
            </Box>
        </Paper>
    );
}

export default IncidentCard;