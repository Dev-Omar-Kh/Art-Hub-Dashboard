import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';
import Numbers from '../../../services/convertNum';
import { useTranslation } from 'react-i18next';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

export default function LineChart({timeLineData, valuesData, startColor, endColor, lineColor}) {

    const {t, i18n} = useTranslation();

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {

        const getCssVar = (variableName) => getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

        const borderColor = getCssVar(lineColor);
        const firstColor = getCssVar(startColor);
        const lastColor = getCssVar(endColor);
        const bordersColor = getCssVar('--mid-gray-color')

        const ctx = chartRef.current.getContext('2d');

        // Destroy old chart if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, firstColor);
        gradient.addColorStop(1, lastColor);

        const newChartInstance = new Chart(ctx, {

            type: 'line',

            data: {

                labels: timeLineData,

                datasets: [{
                    label: t('monthlyDataWord'),
                    data: valuesData,
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: borderColor,
                    tension: 0.4,
                    pointRadius: 0,
                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: { display: false },

                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                return Numbers(value, i18n.language);
                            }
                        }
                    },

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        // max: 500,

                        position: 'right',

                        ticks: {

                            // stepSize: 100,

                            callback: function(value) {
                                return Numbers(value, i18n.language);
                            },

                            font: {
                                family: 'Tajawal',
                                size: 14,
                                weight: '900'
                            }

                        },

                        grid: {
                            color: bordersColor,
                            borderDash: [10, 5],
                            borderWidth: 1,
                            drawTicks: false
                        },

                    },

                    x: {

                        grid: { display: false },

                        ticks: {

                            font: {
                            family: 'Tajawal',
                            size: 10,
                            weight: '900'
                            }

                        }

                    }

                }

            }

        });

        chartInstanceRef.current = newChartInstance;

        return () => {
            newChartInstance.destroy();
        };

    }, [t, i18n.language, startColor, endColor, lineColor, timeLineData, valuesData]);

    return <React.Fragment>

        <div className='w-full'>
            <canvas ref={chartRef} width="600" height="300"></canvas>
        </div>

    </React.Fragment>

}
