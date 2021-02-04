import React, { useState } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import { KnowitColors } from "../styles";
import DescriptionTable from "./DescriptionTable";

const floatingScaleDescButtonStyleDesktop = makeStyles({
    fab: {
        alignSelf: "flex-end",
        width: "fit-content",
        marginRight: "20px",
        marginBottom: "20px",
        backgroundColor: KnowitColors.beige,
        color: KnowitColors.darkBrown,
        position: "absolute",
        bottom: "0px",
        right: "0px",
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "11px",
        lineHeight: "13px",
        height: "35px",
    },
    fabMenu: {
        position: "absolute",
        alignSelf: "flex-end",
        marginRight: "60px",
        marginBottom: "10px",
        bottom: "55px",
        right: "0px",
        borderRadius: "50px 50px 50px 50px",
        backgroundColor: KnowitColors.beige,
        width: "400px",
        // viewport height - headerbar height - bottom margin height - other spacing
	maxHeight: "calc(100vh - 66px - 55px - 20px)",
        overflow: "auto",
        boxShadow:
            "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
    },
    closeButton: {
        marginTop: "15px",
        marginRight: "20px",
        "&:hover": {
            color: KnowitColors.darkGreen,
        },
        float: "right",
        position: "absolute",
        right: "0px",
        top: "0px",
    },
});

const floatingScaleDescButtonStyleMobile = makeStyles({
    fab: {
        alignSelf: "flex-end",
        width: "fit-content",
        marginRight: "20px",
        marginBottom: "20px",
        backgroundColor: KnowitColors.beige,
        position: "absolute",
        bottom: "0px",
        right: "0px",
        fontFamily: "Arial",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "11px",
        lineHeight: "13px",
        height: "35px",
    },
    fabMenu: {
        position: "absolute",
        bottom: "0px",
        right: "0px",
        width: "100%",
        height: "100%",
        zIndex: 101,
        backgroundColor: KnowitColors.beige,
        color: KnowitColors.darkBrown,
        boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.15)",
        borderRadius: "50px 50px 0px 0px",
    },
    closeButton: {
        marginTop: "10px",
        marginRight: "15px",
        "&:hover": {
            color: KnowitColors.darkGreen,
        },
        float: "right",
        position: "absolute",
        right: "0px",
        top: "0px",
    },
});

type FloatingScaleDescButtonProps = {
    isMobile: boolean;
};

const FloatingScaleDescButton = ({
    isMobile,
}: FloatingScaleDescButtonProps) => {
    const style = isMobile
        ? floatingScaleDescButtonStyleMobile()
        : floatingScaleDescButtonStyleDesktop();
    const [scaleDescOpen, setScaleDescOpen] = useState(false);

    return (
        <>
            {scaleDescOpen && (
                <div className={style.fabMenu}>
                    <DescriptionTable
                        onClose={() => setScaleDescOpen(false)}
                        isMobile={isMobile}
                    />
                </div>
            )}
            <Fab
                variant="extended"
                className={style.fab}
                onClick={() =>
                    setScaleDescOpen((scaleDescOpen) => !scaleDescOpen)
                }
            >
                Skalabeskrivelse
            </Fab>
        </>
    );
};

export default FloatingScaleDescButton;
