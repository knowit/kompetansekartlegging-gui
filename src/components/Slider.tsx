import React, { useState } from "react";
import { roundDecimals } from "../helperFunctions";
import { ValueSlider, useStyles } from '../styles'
import { SliderProps } from "../types";


const Slider = ({ ...props }: SliderProps) => {
    const classes = useStyles();

    const [sliderValue, setSliderValue] = useState<number>(-1);

    const sliderChanged = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const sliderCommitted = () => {
        props.sliderChanged(sliderValue, props.motivation);
    };

    return (
        <div className={classes.root}>
            <ValueSlider
                valueLabelDisplay="on"
                valueLabelFormat={value => roundDecimals(value, 1)}
                value={sliderValue}
                onChange={sliderChanged}
                onChangeCommitted={sliderCommitted}
                step={0.01}
                max={5}
            />
        </div>
    );
};

export default Slider;
