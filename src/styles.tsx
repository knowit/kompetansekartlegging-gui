import { makeStyles, Slider, withStyles } from "@material-ui/core";




export const useStyles = makeStyles({
    root: {
        width: 400,
        marginLeft: 50
    },
});




export const ValueSlider = withStyles({
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        marginTop: -14,
        marginLeft: -14
    },
    valueLabel: {
        left: 'calc(-50% + 12px)',
        top: '30%',
        '& *': {
            background: 'transparent',
            color: '#000',
        },
    },
    track: {
        height: 2,
        opacity: 1,
        backgroundColor: '#00f'
    },
    rail: {
        height: 2,
        opacity: 1,
        backgroundColor: '#00f'
    }
})(Slider);


