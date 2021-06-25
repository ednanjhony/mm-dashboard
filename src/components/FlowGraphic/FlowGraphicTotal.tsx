import { Box, Text, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: true,
    },
    xaxis: {
        type: 'category',
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            'Jan 2021',
            'Fev 2021',
            'Mar 2021',
            'Abr 2021',
            'Mai 2021',
            'Jun 2021',
            'Jul 2021',
            'Ago 2021',
            'Set 2021',
            'Out 2021',
            'Nov 2021',
            'Dez 2021',
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },
    },
};

const series = [
    {
        name: 'series1',
        data: [
            9000, 
            12000,
            3000,
            5000,
            10000,
            30000,
            8000,
            2000,
            4000,
            9020,
            12305,
            20000,
        ]
    }
]

export default function FlowGraphicTotal() {
    return (
        <Box
            p="8"
            bg="gray.200"
            borderRadius={8}
            pb="4"
        >
            <Text fontSize="lg" fontWeight="bold" color="blue.500">Total livre</Text>
            <Chart
                options={options}
                series={series}
                type="area"
                height={160}
            />
        </Box>
    )
}