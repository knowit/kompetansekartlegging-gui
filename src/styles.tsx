import { makeStyles, Slider, withStyles } from "@material-ui/core";


export const KnowitColors = {
    black: "#000000",
    white: "#FFFFFF",
    darkBrown: "#393939",
    creme: "#F1EEEE",
    beige: "#E4E0DC",
    green: "#52B469",
    darkGreen: "#596961",
    lightGreen: "#C3DEC3",
    ecaluptus: "#DFEDE1",
    greyGreen: "#ADB7AF",
    fuchsia: "#EA3FF3",
    burgunder: "#7A3E50",
    flamingo: "#F3C8BA",
    lightPink: "#F7E1DD"
};

export const useStyles = makeStyles({
    root: {
        width: 400,
        marginLeft: 50
    }
});


export const FontSettings = makeStyles({
    lighter: {
        fontWeight: "lighter"
    },
    normal: {
        fontWeight: "normal"
    },
    bold: {
        fontWeight: "bold"
    },
    bolder: {
        fontWeight: "bolder"
    },
    sizeSmall: {
        fontSize: 8
    }
});

export const ValueSlider = withStyles({
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: KnowitColors.lightGreen,
        marginTop: -14,
        marginLeft: -14
    },
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: '30%',
        '& *': {
            background: 'transparent',
            color: KnowitColors.black,
            fontWeight: "bold"
        }
    },
    track: {
        height: 2,
        opacity: 1,
        backgroundColor: KnowitColors.darkGreen
    },
    rail: {
        height: 2,
        opacity: 1,
        backgroundColor: KnowitColors.darkGreen
    }
})(Slider);

export const QuestionBlock = makeStyles({
    root: {
        flexGrow: 1,
        margin: 10,
        backgroundColor: 'lightBlue'
    },
    topic: {
        fontWeight: "bold"
    },
    text: {
    },
    slider: {
    },
    smallBold: {
        fontSize: 12,
        fontWeight: "bold"
    },
    largeBold: {
        fontSize: 14,
        fontWeight: "bold"
    }
});

export const CardStyle = makeStyles({
    cardButton: {
        fontWeight: "bold",
        fontSize: 18,
        padding: 10,
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        textAlign: "left",
        width: "100%"
    },
    closed: {
    },
    open: {
        height: 500,
        overflow: "auto"
    }
});

export const OverviewStyle = makeStyles({
    root: {
        width: "100%",
        backgroundColor: KnowitColors.white
    },
    radarPlot: {
        height: 400,
        width: 400
    }
});

export const ScaleDescStyle = makeStyles({
    root: {
        width: "100%",
        backgroundColor: KnowitColors.ecaluptus
    }
});

export const AnswersStyle = makeStyles({
    root: {
        width: "100%",
        backgroundColor: KnowitColors.greyGreen
    }
});




