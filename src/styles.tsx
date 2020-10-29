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

export const IconPaths: string[] = [
    "K_ingen.svg",
    "K_noeInnsikt.svg",
    "K_potesieltBrukbar.svg",
    "K_profesjoneltNivå.svg",
    "K_ekspert.svg",
    "K_superstjerne.svg",
    "M_nei.svg",
    "M_egentligIkke.svg",
    "M_nja.svg",
    "M_ok.svg",
    "M_godt.svg",
    "M_perfekt.svg"
];

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
    },
    open: {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        // flexGrow: 1
        height: '100%'
    }
});

export const OverviewStyle = makeStyles({
    root: {
        maxHeight: '30%',
        width: "100%",
        backgroundColor: KnowitColors.white
    },
    radarPlot: {
        paddingLeft: '10%',
        height: '100%',
        width: '75%',
        display: "flex"

    },
    cardHeader: {
        display: "flex"
    },
    closeButton: {
        marginTop: "3px",
        marginRight: "32px",
        '&:hover': {
            color: KnowitColors.darkGreen
        }
    }
});


export const ScaleDescStyle = makeStyles({
    root: {
        maxHeight: '30%',
        width: "100%",
        backgroundColor: KnowitColors.ecaluptus
    },
    cardHeader: {
        display: "flex"
    },
    closeButton: {
        marginTop: "3px",
        marginRight: "32px",
        '&:hover': {
            color: KnowitColors.darkGreen
        }
    }
});

// export const AnswersStyle = makeStyles({
//     root: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: "100%",
//         backgroundColor: KnowitColors.greyGreen
//     },
//     header: {
//     },
//     form: {
//         flexGrow: 2,
//         flex: '0 1 auto',
//         overflowY: 'auto',
//         height: '100%'
//     }
// });

// export const QuestionBlock = makeStyles({
//     root: {
//         marginTop: 10,
//         marginLeft: 10,
//         marginRight: 10,
//         backgroundColor: KnowitColors.ecaluptus
//     },
//     categoryGroup: {
//         // marginTop: 10,
//         paddingBottom: 10,
//         backgroundColor: KnowitColors.lightGreen,
//         width: '100%'
//     },
//     categoryText: {
//         fontSize: 22,
//         fontWeight: 'bold'
//     },
//     topic: {
//         fontWeight: "bold"
//     },
//     sliderGroup: {
//         display: 'flex',
//         flexWrap: "nowrap",
//         justifyContent: 'flex-start',
//         alignItems: 'center'
//     },
//     smallBold: {
//         fontSize: 14,
//         fontWeight: "bold"
//     },
//     largeBold: {
//         fontSize: 18,
//         fontWeight: "bold"
//     }
// });

export const DescTableStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: KnowitColors.ecaluptus
    },
    scaleRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
    },
    scaleTitle: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        justifyContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '10%'
    },
    container: {
        display: 'flex',
        flex: 1,
        flexGrow: 5,
        flexDirection: 'column',
        padding: 5
    },
    top: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 10,
        paddingBottom: 20
    },
    bottom: {
        display: 'flex'
    },
    iconArea: {
        height: 30,
        paddingRight: 5
    },
    icon: {
        height: "100%"
    },
    textBlock: {
        display: 'flex',
        flexDirection: 'column'
    },
    heading: {
        textAlign: 'left',
        fontSize: 10,
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'left',
        fontSize: 10
    }
});










