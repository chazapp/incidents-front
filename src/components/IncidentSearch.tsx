import { Box, FormControl, IconButton, InputAdornment,
     InputLabel, OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import React from "react";


function IncidentSearch() {
    return (
        <Box sx={{
            display: "flex",
            flexGrow: "1",
        }}>
            <FormControl sx={{
                width: "100%",
            }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="search"
                    edge="end"
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
                }
                label="Search"
            />
            </FormControl>
        </Box>
    );
}

export default IncidentSearch;