import React from "react";
import { ValueSlider, useStyles } from '../styles'
import { SliderProps } from "../types";


const Slider = ({ ...props }: SliderProps) => {
    const classes = useStyles();

    const sliderChanged = (event: any, newValue: number | number[]) => {
        props.sliderChanged(newValue as number, props.motivation);
    };

    return (
        <div className={classes.root}>
            {/* {console.log(props.value)} */}
            <ValueSlider
                defaultValue={props.value}
                valueLabelDisplay="on"
                valueLabelFormat={value => Math.round(value * 10) / 10}
                value={props.value >= 0 ? props.value : 0}
                onChange={sliderChanged}
                step={0.01}
                max={5}
            />
        </div>
    );
};

export default Slider;
