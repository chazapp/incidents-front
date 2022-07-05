import { Box, FormControl, IconButton, InputAdornment,
     InputLabel, OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import React from "react";
import { Incident } from "../index.d";
import axios from "axios";


function IncidentSearch(props: {setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [searchValue, setSearchValue] = React.useState("");
    const { setIncidents, setIsLoading } = props;

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
                    type="search"
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            setIsLoading(true);
                            setIncidents([]);
                            axios.get(`/incidents/?search=${searchValue}`)
                                .then((res) => {
                                    setIsLoading(false);
                                    setIncidents(res.data.results);
                                }
                            )
                        }
                    }}
                />
            </FormControl>
        </Box>
    );
}

export default IncidentSearch;