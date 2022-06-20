import React from "react";
import { Incident } from "../index.d";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";


const IncidentAdd = (props: {setSelectedIncident: React.Dispatch<React.SetStateAction<Incident | null>>}) => {
    const { setSelectedIncident } = props;
    const [ open, setOpen ] = React.useState(false);
    const newIncident: Incident = {
        id: 0,
        title: "",
        description: "",
        severity: "",
        status: "",
        created_at: new Date(),
        updated_at: new Date(),
    };

    const handleClose = () => {
        setOpen(false);
      };
    

    return(
        <Box sx={{
        }}>
            <IconButton
                aria-label="add"
                onClick={() => {
                    setOpen(true);
                }}
                
            >
                <AddCircleIcon fontSize="large"/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
            </Dialog>
        </Box>
    )
};

export default IncidentAdd;