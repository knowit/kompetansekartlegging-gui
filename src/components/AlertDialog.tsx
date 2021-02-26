import React from "react";
import {
    makeStyles,
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
} from "@material-ui/core";
import { AlertDialogProps } from "../types";
import ErrorIcon from "@material-ui/icons/Error";
import { KnowitColors } from "../styles";

const alertDialogStyles = makeStyles({
    stayButton: {
        width: "162px",
        height: "38px",
        border: "3px solid",
        background: KnowitColors.lightGreen,
        borderRadius: "19px",
        borderColor: KnowitColors.lightGreen,
    },
    leaveButton: {
        width: "162px",
        height: "38px",
        border: "3px solid",
        borderColor: KnowitColors.flamingo,
        boxsizing: "border-box",
        borderRadius: "19px",
    },
    buttonText: {
        fontWeight: "bold",
        textTransform: "none",
        lineHeight: 1,
    },
    errorIcon: {
        fill: KnowitColors.fuchsia,
        height: "38px",
        width: "38px",
    },
    alertText: {
        color: "black",
    },
    alertButtons: {
        justifyContent: "space-evenly",
        marginBottom: "10px",
    },
    dialogTitle: {
        "& h2": {
            display: "flex",
        },
    },
    dialogTitleText: {
        fontWeight: "bold",
        marginTop: "4px",
        marginLeft: "8px",
    },
});

export const AlertDialog = ({ ...props }: AlertDialogProps) => {
    const style = alertDialogStyles();

    const handleStayInForm = () => {
        props.setAlertDialogOpen(false);
    };

    const handleLeave = () => {
        if (props.leaveFormButtonClicked) props.leaveFormButtonClicked();
    };

    return (
        <div>
            <Dialog
                open={props.alertDialogOpen}
                onClose={handleStayInForm}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                PaperProps={{
                    style: { borderRadius: 30 },
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    className={style.dialogTitle}
                >
                    <ErrorIcon
                        fontSize="large"
                        className={style.errorIcon}
                    ></ErrorIcon>
                    <div className={style.dialogTitleText}>
                        Obs! Svarene dine er ikke lagret.
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-description"
                        className={style.alertText}
                    >
                        Hvis du forlater skjemaet nå vil ikke endringene du har
                        gjort bli lagret.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={style.alertButtons}>
                    <Button onClick={handleLeave} className={style.leaveButton}>
                        <div className={style.buttonText}>Forlat skjemaet</div>
                    </Button>
                    <Button
                        onClick={handleStayInForm}
                        autoFocus
                        className={style.stayButton}
                    >
                        <div className={style.buttonText}>Bli på skjemaet</div>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
