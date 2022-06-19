import React from "react";
import { Box } from "@mui/material";
import PersistentDrawer from "../components/Navigation";


function Dashboard(props: {menuOpen: boolean, setMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { menuOpen, setMenuOpen } = props;
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
                </Box>
            </PersistentDrawer>
        </Box>
    );
}

export default Dashboard;