import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

import { Box } from '@mui/material';

export function ProcessVariantsChart(props: any) {
    const chartId = "processVariants";

    useEffect(() => {
        var theChart = echarts.init(document.getElementById(chartId)!);

        const width = theChart.getWidth();
        const height = theChart.getHeight();

        console.log(width, height);

        let option: echarts.EChartsOption = {
            type: 'graph',

            title: {
                text: 'Basic Graph',
                textStyle: {
                    fontFamily: 'Roboto',
                    fontWeight: 400,
                    color: '#6644ee'
                },
                borderType: 'dashed',
                borderWidth: 1,
                top: 5,
                left: 5
            },
            tooltip: {},
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'circular',
                    force: {
                        repulsion: 1000,
                        edgeLength: 300
                    },
                    symbolSize: 50,
                    roam: true,
                    label: {
                        show: true
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        fontSize: 20
                    },
                    data: [
                        {
                            name: 'Node 1',
                            x: 300,
                            y: 300
                        },
                        {
                            name: 'Node 2',
                            x: 800,
                            y: 300
                        },
                        {
                            name: 'Node 3',
                            x: 550,
                            y: 100
                        },
                        {
                            name: 'Node 4',
                            x: 550,
                            y: 500
                        },
                        {
                            name: 'Node 5',
                            x: 1000,
                            y: 300
                        }
                    ],
                    // links: [],
                    links: [
                        {
                            source: 0,
                            target: 4,
                            lineStyle: {
                                curveness: 0.3
                            }
                        },
                        {
                            source: 1,
                            target: 4,
                            symbolSize: [5, 20],
                            label: {
                                show: true
                            },
                            lineStyle: {
                                width: 5,
                                curveness: 0.2
                            }
                        },
                        {
                            source: 0,
                            target: 1,
                            symbolSize: [5, 20],
                            label: {
                                show: true
                            },
                            lineStyle: {
                                width: 5,
                                curveness: 0.2
                            }
                        },
                        {
                            source: 'Node 2',
                            target: 'Node 1',
                            lineStyle: {
                                curveness: 0.2
                            }
                        },
                        {
                            source: 'Node 1',
                            target: 'Node 3',
                        },
                        {
                            source: 'Node 2',
                            target: 'Node 3'
                        },
                        {
                            source: 'Node 2',
                            target: 'Node 4'
                        },
                        {
                            source: 'Node 1',
                            target: 'Node 4'
                        }
                    ],
                    lineStyle: {
                        opacity: 0.9,
                        width: 2,
                        curveness: 0
                    }
                }
            ]
        };

        theChart.setOption(option);

        theChart.getZr().on('click', e => console.log(e));
        theChart.on('click', e => console.log(e));

        return () => { theChart.dispose(); }
    });

    return (<Box id={chartId} sx={{ flexGrow: 1, height: '99%' }}></Box>);
}