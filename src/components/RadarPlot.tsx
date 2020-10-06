import { ResponsiveRadar } from '@nivo/radar'
import React, { useEffect } from 'react'
import {AggregatedCategory, AnsweredQuestion} from '../types'

export default function RadarPlot(props: { data: AnsweredQuestion[] }) {

    let aggregatedCategories: AggregatedCategory[] = [];

    useEffect(() => {
        props.data.map(value => {
            let category = aggregatedCategories.find(cat => cat.category === value.question.category);
            if(!category) {
                category = {
                    category: value.question.category,
                    aggregatedValue: 0,
                    aggregatedAverage: 0,
                    numberOfValues: 0
                }
                
                aggregatedCategories.push(category);
            }
            if(value.answer !== -1) {
                category.numberOfValues++;
                category.aggregatedValue += value.answer;
                category.aggregatedAverage = category.aggregatedValue / category.numberOfValues;
            }
        });
    }, [props.data]);

    return (
        <ResponsiveRadar
        data={aggregatedCategories}
        keys={[ 'aggregatedAverage' ]}
        indexBy="category"
        maxValue = {5}
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        gridShape="linear"
        dotSize={10}
        enableDotLabel={true}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    )
}
