import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

import { Box } from '@mui/material';
import { SportsRugbySharp } from '@mui/icons-material';

export function ProcessVariantsChart(props: any) {
    const chartId = "processVariants";

    useEffect(() => {
        var theChart = echarts.init(document.getElementById(chartId)!);

        theChart.showLoading();
        const width = theChart.getWidth();
        const height = theChart.getHeight();

        console.log(width, height);

        setTimeout(() => {
            let option: echarts.EChartsOption = {
                type: 'graph',
                textStyle: {
                    fontFamily: 'Roboto',
                    fontWeight: 400,
                    color: '#555',
                },
                title: {
                    text: 'Process Variants',
                    textStyle: {
                        fontFamily: 'Roboto',
                        fontWeight: 400,
                        color: '#555',
                    },
                    borderType: 'dotted',
                    borderWidth: 1,
                    top: 10,
                    left: 50
                },
                tooltip: {
                    show: true,
                    textStyle: {
                        fontFamily: 'Roboto',
                        fontWeight: 500,
                        color: '#555',
                        width: 200,
                        height: 150,
                    },
                    backgroundColor: 'rgba(230,220,200, 0.9)',
                    borderColor: 'rgba(130, 100, 80)',
                    borderWidth: 1,
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                toolbox: {
                    show: true,
                    showTitle: false,
                    orient: 'vertical',
                    left: 10,
                    top: 10,
                    itemSize: 20,
                    itemGap: 15,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderType: 'dotted',
                    iconStyle: {
                        color: '#000',
                        opacity: 0.4
                    },
                    feature: {
                        restore: {
                            show: true,
                            title: 'Restore',
                            icon: 'path://M32 12h-12l4.485-4.485c-2.267-2.266-5.28-3.515-8.485-3.515s-6.219 1.248-8.485 3.515c-2.266 2.267-3.515 5.28-3.515 8.485s1.248 6.219 3.515 8.485c2.267 2.266 5.28 3.515 8.485 3.515s6.219-1.248 8.485-3.515c0.189-0.189 0.371-0.384 0.546-0.583l3.010 2.634c-2.933 3.349-7.239 5.464-12.041 5.464-8.837 0-16-7.163-16-16s7.163-16 16-16c4.418 0 8.418 1.791 11.313 4.687l4.687-4.687v12z',
                        },
                        dataZoom: {
                            show: true,
                            title: {
                                zoom: 'Zoom In',
                                back: 'Zoom Out'
                            },
                            icon: {
                                zoom: 'path://M32 0v13l-5-5-6 6-3-3 6-6-5-5zM14 21l-6 6 5 5h-13v-13l5 5 6-6z',
                                back: 'path://M14 18v13l-5-5-6 6-3-3 6-6-5-5zM32 3l-6 6 5 5h-13v-13l5 5 6-6z',
                            }
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Save As Image',
                            icon: 'path://M23 14l-8 8-8-8h5v-12h6v12zM15 22h-15v8h30v-8h-15zM28 26h-4v-2h4v2z',
                        }
                    }
                },
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        force: {
                            repulsion: 1000,
                            edgeLength: 300
                        },
                        symbol: 'rect',
                        symbolSize: 50,
                        roam: true,
                        label: {
                            show: true,
                            position: 'inside',
                        },
                        edgeSymbol: ['circle', 'arrow'],
                        edgeSymbolSize: [4, 10],
                        edgeLabel: {
                            fontSize: 20
                        },
                        selectedMode: 'multiple',
                        select: {
                            itemStyle: {
                                borderWidth: 0,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            label: {
                                show: true,
                                position: 'inside',
                                formatter: [
                                    "{title|{b}}{titleBg|}",
                                    "{rowLeft|Variants:}{rowRight|25}",
                                    "{hr|}",
                                    "{rowLeft|IsBlocked:}{rowRight|Yes}",
                                ].join('\n'),
                                color: '#aaa',
                                fontSize: 14,
                                width: 200,
                                fontFamily: 'Roboto',
                                backgroundColor: '#eee',
                                borderColor: '#777',
                                borderWidth: 1,
                                borderRadius: 4,
                                padding: 4,
                                rich: {
                                    title: {
                                        align: 'center',
                                        lineHeight: 25,
                                    },
                                    titleBg: {
                                        borderRadius: [4, 4, 0, 0],
                                        width: '100%',
                                        height: 25,
                                        backgroundColor: '#555',
                                        align: 'right',
                                    },
                                    rowLeft: {
                                        align: 'left',
                                        lineHeight: 25,
                                    },
                                    rowRight: {
                                        align: 'right',
                                        lineHeight: 25,
                                    },
                                    hr: {
                                        borderWidth: 0.5,
                                        borderType: 'dotted',
                                        borderColor: '#777',
                                        width: '100%',
                                        height: 0,
                                    }
                                }
                            }
                        },
                        labelLayout: {
                            draggable: true
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            label: {
                                show: true,
                                position: 'inside',
                                formatter: [
                                    "{title|{b}}{titleBg|}",
                                    "{rowLeft|Variants:}{rowRight|25}",
                                    "{hr|}",
                                    "{rowLeft|IsBlocked:}{rowRight|Yes}",
                                ].join('\n'),
                                color: '#aaa',
                                fontSize: 14,
                                width: 200,
                                fontFamily: 'Roboto',
                                backgroundColor: '#eee',
                                borderColor: '#777',
                                borderWidth: 1,
                                borderRadius: 4,
                                padding: 4,
                                rich: {
                                    title: {
                                        align: 'center',
                                        lineHeight: 25,
                                    },
                                    titleBg: {
                                        borderRadius: [4, 4, 0, 0],
                                        width: '100%',
                                        height: 25,
                                        backgroundColor: '#555',
                                        align: 'right',
                                    },
                                    rowLeft: {
                                        align: 'left',
                                        lineHeight: 25,
                                    },
                                    rowRight: {
                                        align: 'right',
                                        lineHeight: 25,
                                    },
                                    hr: {
                                        borderWidth: 0.5,
                                        borderType: 'dotted',
                                        borderColor: '#777',
                                        width: '100%',
                                        height: 0,
                                    }
                                }
                            }
                        },
                        categories: [
                            {
                                name: "variant 1",
                                symbol: 'roundRect'
                            },
                            {
                                name: "variant 2",
                            },
                        ],
                        data: [
                            {
                                name: 'Node 1',
                                x: 300,
                                y: 300,
                                category: 0,
                                fixed: true,
                            },
                            {
                                name: 'Node 2',
                                x: 800,
                                y: 300,
                                category: 0,
                                fixed: true,
                            },
                            {
                                name: 'Node 3',
                                x: 550,
                                y: 100,
                                category: 0,
                            },
                            {
                                name: 'Node 4',
                                x: 550,
                                y: 500,
                                category: 1,
                            },
                            {
                                name: 'Node 5',
                                x: 1000,
                                y: 300,
                                category: 1,
                                fixed: true,
                            }
                        ],
                        // links: [],
                        links: [
                            {
                                source: 0,
                                target: 4,
                                lineStyle: {
                                    curveness: 0.4
                                },
                            },
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
                            color: 'target',
                            opacity: 0.9,
                            width: 2,
                            curveness: 0
                        }
                    }
                ]
            };

            theChart.hideLoading();
            theChart.setOption(option);

            //theChart.getZr().on('click', e => console.log(e));
            theChart.on('click', e => console.log(e));
        }, 100);

        return () => { theChart.dispose(); }
    });

    return (<Box id={chartId} sx={{ flexGrow: 1, height: '99%' }}></Box>);
}