import { makeStyles, Slider, withStyles } from "@material-ui/core";
import { autoShowTooltip } from "aws-amplify";


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


export const AppStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    content: {
        height: '100%',
        flexGrow: 1
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
    sliderGroup: {
        display: 'flex',
        flexWrap: "nowrap",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sliderComponent: {
    },
    slider: {

    },
    smallBold: {
        fontSize: 14,
        fontWeight: "bold"
    },
    largeBold: {
        fontSize: 18,
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
    cardHolder: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%'
    },
    closed: {
        flexGrow: 0
    },
    open: {
        flexGrow: 1,
        overflowY: 'auto',
        height: '100%'
    }
});

export const OverviewStyle = makeStyles({
    root: {
        width: "100%",
        flexGrow: 0.5,
        backgroundColor: KnowitColors.white
    },
    radarPlot: {
        paddingLeft: '5%',
        height: '90%',
        width: '75%'
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














