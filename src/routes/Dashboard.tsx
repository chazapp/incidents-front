import React, { useEffect } from "react";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import PersistentDrawer from "../components/Navigation";


function Dashboard(props: {menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { menuOpen, setMenuOpen } = props;
    const [incidentCount, setIncidentCount] = React.useState(0);
    useEffect(() => {
        axios.get("/incidents/")
            .then(res => {
                setIncidentCount(res.data.count);
            }
        ).catch(err => {
            console.log(err);
        });
    });

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "1vh",
        }}>
            <PersistentDrawer
                open={menuOpen}
                setOpen={setMenuOpen}
                pageName="Dashboard"
            >
                <Box aria-label="Content" sx={{
                    display: "flex",
                    rowGap: "1rem",
                    columnGap: "1rem",
                }}>
                    <Paper>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            padding: "2rem",
                            alignItems: "center",
                        }}>
                            <Typography variant="h6">Number of Incidents</Typography>
                            <Typography variant="h4" data-cy="incident-count">{incidentCount}</Typography>
                        </Box>
                    </Paper>
                </Box>
            </PersistentDrawer>
        </Box>
    );
}

export default Dashboard;