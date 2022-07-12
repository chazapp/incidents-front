import { Box, FormControl, IconButton, InputAdornment,
     InputLabel, OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import React from "react";

function IncidentSearch(props: {onSearch: (query: string) => void}) {
    const [searchValue, setSearchValue] = React.useState("");
    const { onSearch } = props;

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
                            onSearch(searchValue);
                        }
                    }}
                />
            </FormControl>
        </Box>
    );
}

export default IncidentSearch;