import React from "react";
import { Box } from "@mui/material";
import PersistentDrawer from "../components/Navigation";


function Dashboard() {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "1vh",
        }}>
            <PersistentDrawer>
                <Box aria-label="Content" sx={{
                    display: "flex",
                    rowGap: "1rem",
                    columnGap: "1rem",
                }}>
                </Box>
            </PersistentDrawer>
        </Box>
    );
}

export default Dashboard;