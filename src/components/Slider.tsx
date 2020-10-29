import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { roundDecimals } from "../helperFunctions";
import { ValueSlider } from '../styles'
import { SliderProps } from "../types";

const Slider = ({ ...props }: SliderProps) => {
    const [sliderValue, setSliderValue] = useState<number>(-1);

    const sliderChanged = (event: any, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const sliderCommitted = () => {
        props.sliderChanged(sliderValue, props.knowledge);
    };

    useEffect(() => {
        setSliderValue(props.value);
    },[]);

    return (
        <ValueSlider
            valueLabelDisplay="on"
            valueLabelFormat={value => roundDecimals(value, 1)}
            value={sliderValue}
            onChange={sliderChanged}
            onChangeCommitted={sliderCommitted}
            step={0.01}
            max={5}
        />
    );
};

export default Slider;
