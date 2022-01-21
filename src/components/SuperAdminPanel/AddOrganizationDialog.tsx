import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import { dialogStyles } from "../../styles";
import { CloseIcon } from "../DescriptionTable";


const AddOrganizationDialog = ({ onCancel, onConfirm, open } : any) => {
    const style = dialogStyles();
    const [organizationName, setOrganizationName] = useState("");
    const [organizationID, setOrganizationID] = useState("");

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                style: { borderRadius: 30 },
            }}
        >
            <DialogTitle>
                <Box
                    component="div"
                    mb={1}
                    display="flex"
                    justifyContent="space-between"
                >
                    <span className={style.dialogTitleText}>
                        Legg til ny organisasjon
                    </span>
                    <IconButton
                        className={style.closeButton}
                        onClick={onCancel}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <TextField
                    autoFocus
                    fullWidth
                    label="ID"
                    variant="outlined"
                    error={organizationID === ""}
                    helperText={organizationID === "" && "ID kan ikke være tom."}
                    value={organizationID}
                    className={style.textField}
                    onChange={(e: any) => setOrganizationID(e.target.value)}
                />
                <TextField
                    autoFocus
                    fullWidth
                    label="Navn"
                    variant="outlined"
                    error={organizationName === ""}
                    helperText={organizationName === "" && "Navn kan ikke være tom."}
                    value={organizationName}
                    className={style.textField}
                    onChange={(e: any) => setOrganizationName(e.target.value)}
                />
            </DialogTitle>
            <DialogActions className={style.alertButtons}>
                <Button onClick={onCancel} className={style.cancelButton}>
                    <span className={style.buttonText}>Avbryt</span>
                </Button>
                <Button
                    disabled={organizationName === ""}
                    onClick={() => onConfirm({
                        id: organizationID,
                        name: organizationName
                    })}
                    className={style.confirmButton}
                >
                    <span className={style.buttonText}>Legg til</span>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrganizationDialog;