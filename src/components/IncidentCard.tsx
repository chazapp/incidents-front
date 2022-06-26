import React from "react";
import { Box, Paper, Divider, FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput, Select, MenuItem, TextareaAutosize, Typography } from "@mui/material";
import { Incident } from "../index.d";
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

function IncidentCard(props: { incident: Incident, onCreate: (incident: Incident) => void, onUpdate: (incident: Incident) => void, onDelete: (incident: Incident) => void }) {
    const { incident } = props;
    const [ title, setTitle ] = React.useState("");
    const [ severity, setSeverity ] = React.useState("");
    const [ status, setStatus ] = React.useState("");
    const [ description, setDescription ] = React.useState("");

    const [ editTitle, setEditTitle ] = React.useState(false);
    const [ editDescription, setEditDescription ] = React.useState(false);

    React.useEffect(() => {
        setTitle(incident.title);
        setSeverity(incident.severity);
        setStatus(incident.status);
        setDescription(incident.description);
        if (incident.id === -1) {
            setEditDescription(true);
            setEditTitle(true);
        }
    }, [incident]);

    const makeIncident = () => {
        const newIncident: Incident = {
            id: incident.id,
            title,
            severity,
            status,
            description,
            created_at: incident.created_at,
            updated_at: incident.updated_at,
        };
        return newIncident;
    }

    const validate = () => {
        return title.length > 0 && severity.length > 0 && status.length > 0 && description.length > 0;
    }

    return (
        <Paper sx={{
            display: "flex",
            flexGrow: "1",
            flexDirection: "column",
        }} elevation={3}>
            <Box aria-label="incident-header" sx={{
                display: "flex",
                padding: "1rem",
                flexDirection: "column",
                gap: "1rem",
            }}>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Title</InputLabel>
                    <OutlinedInput
                        disabled={!editTitle}
                        id="component-outlined"
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        data-cy="incident-title-input"
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setEditTitle(false);
                            }
                        }}
                        endAdornment={
                            <InputAdornment position="end" onClick={() => setEditTitle(!editTitle)}>
                                <IconButton>
                                    <EditIcon data-cy="incident-edit-title"/>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Box aria-label="incident-infos" sx={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <Box sx={{ display: "flex", flexGrow: "1", gap: "1rem"}}>
                        <FormControl sx={{minWidth: 120 }}>
                            <InputLabel id="incident-severity">Severity</InputLabel>
                            <Select
                                labelId="incident-severity"
                                label="Severity"
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                                data-cy="incident-severity-select"
                            >
                                <MenuItem value="Low" data-cy="incident-severity-low">Low</MenuItem>
                                <MenuItem value="Medium" data-cy="incident-severity-medium">Medium</MenuItem>
                                <MenuItem value="High" data-cy="incident-severity-high">High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl  sx={{minWidth: 120 }}>
                            <InputLabel id="incident-status">Status</InputLabel>
                            <Select
                                labelId="incident-status"
                                label="Severity"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                data-cy="incident-status-select"
                            >
                                <MenuItem value="Open" data-cy="incident-status-open">Open</MenuItem>
                                <MenuItem value="Closed" data-cy="incident-status-closed">Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} disabled={incident.id === -1}
                            onClick={() => {
                                const newIncident = makeIncident();
                                props.onDelete(newIncident);
                            }} data-cy="incident-delete-button">
                            Delete
                        </Button>
                        <Button data-cy="incident-submit" variant="contained" endIcon={<SendIcon />} disabled={!validate()}
                            onClick={() => {
                                const newIncident = makeIncident();
                                if (incident.id === -1) {
                                    props.onCreate(newIncident);
                                } else {
                                    props.onUpdate(newIncident);
                                }   
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box aria-label="incident-description" sx={{
                        display: "flex",
                        flexGrow: "1",
                        flexDirection: "column",
                        padding: "1rem",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                    }}
                    onClick={() => {
                        setEditDescription(true);
                    }}
                    data-cy="incident-description"
                >
                {editDescription ? 
                <TextareaAutosize style={{height: "100%"}} value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    data-cy="incident-description-input"
                    onBlur={() => { setEditDescription(false); }}
                />
                : <Typography>{description}</Typography>
                }
            </Box>
        </Paper>
    );
}

export default IncidentCard;