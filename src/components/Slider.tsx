import React, { useEffect, useState } from "react";
import { roundDecimals } from "../helperFunctions";
// import { ValueSlider } from '../styles';
import { SliderProps } from "../types";
import * as helper from '../helperFunctions';
import { KnowitColors } from "../styles";
import { withStyles, Slider as CoreSlider } from "@material-ui/core";

const ValueSlider = withStyles({
    thumb: {
        height: 28,
        width: 28,
        backgroundColor: KnowitColors.beige,
        marginTop: -14,
        marginLeft: -14,
        opacity: 0
    },
    // valueLabel: {
    //     left: 'calc(-50% + 12px)',
    //     top: '30%',
    //     '& *': {
    //         background: 'transparent',
    //         color: KnowitColors.black,
    //         fontWeight: "bold"
    //     }
    // },
    track: {
        backgroundColor: KnowitColors.white,
        height: 15
    },
    rail: {
        // height: 2,
        opacity: 0,
        height: 15
        // backgroundColor: KnowitColors.darkGreen
    },
    mark: {
        backgroundColor: KnowitColors.white,
        height: 15,
        width: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: KnowitColors.black,
        borderRadius: 10,
        marginTop: -3,
        marginLeft: -2,
        alignSelf: 'center'
    },
    markActive: {
        opacity: 1,
        backgroundColor: KnowitColors.black,
    },
    '@global': {
        'span:nth-child(4)': {
            height: 30,
        },
        'span:nth-child(14)': {
            height: 30,
        },
        'span:nth-child(24)': {
            height: 30,
        },
        'span:nth-child(34)': {
            height: 30,
        },
        'span:nth-child(44)': {
            height: 30,
        },
        'span:nth-child(54)': {
            height: 30,
        },
    },
    root: {
        display: 'flex'
    }
}, {name: 'MuiSlider'}) (CoreSlider);

const marks = new Array(51).fill(undefined).map((v, i) => { return { value: (i / 10) || 0 } });
// [
//     { value: 0, },
//     { value: 1, },
//     { value: 2, },
//     { value: 3, },
//     { value: 4, },
//     { value: 5, },
// ];

const Slider = ({ ...props }: SliderProps) => {
    const [sliderValue, setSliderValue] = useState<number>(-1);

    const sliderChanged = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const sliderCommitted = () => {
        setSliderValue(helper.roundDecimals(sliderValue, 1));
        props.sliderChanged(helper.roundDecimals(sliderValue, 1), props.motivation);
    };
    
    

    useEffect(() => {
        setSliderValue(props.value);
    },[]);

    return (
        <ValueSlider
            // valueLabelDisplay="on"
            // valueLabelFormat={value => roundDecimals(value, 1)}
            value={sliderValue}
            onChange={sliderChanged}
            onChangeCommitted={sliderCommitted}
            step={0.1}
            max={5}
            marks={marks}
        />
    );
};

export default Slider;
