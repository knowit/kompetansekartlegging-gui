import { ResponsiveRadar } from '@nivo/radar'
import React from 'react'

export default function RadarPlot(props: { data: object[] }) {
    return (
        <ResponsiveRadar
        data={props.data}
        keys={[ 'knowledge', 'motivation' ]}
        indexBy="category"
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
