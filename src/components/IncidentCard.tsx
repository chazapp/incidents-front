import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Incident } from "../interfaces";


function IncidentCard(props: { incident: Incident }) {
    const { incident } = props;
    return (
        <Paper sx={{
            display: "flex",
            flexGrow: "1",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                textAlign: "center",
            }}>
                <Typography variant="h6">{incident.title}</Typography>
                <Typography variant="body1">{incident.status}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
            }}>
                <Typography variant="body1">{incident.description}</Typography>
                <Typography variant="body1">{incident.severity}</Typography>
            </Box>
        </Paper>
    );
}

export default IncidentCard;