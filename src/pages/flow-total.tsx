import { Flex, Box, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import Sidebar  from '../components/Sidebar'
import  { api } from '../services/api';

import { useState, useEffect } from 'react'

type FlowIn = {
    id: number;
    date: string;
    price: number;
    material: string;
}

export default function FlowsTotal() {
    const [flowsIn, setFlowsIn] = useState<FlowIn[]>([])

    useEffect(() => {
        api.get('flow-total')
            .then(response => setFlowsIn(response.data.flowsIn))
    }, []);

    return (
        <Flex>
            <Sidebar />
            <Flex w="100%" flexDir="column">
                <Box w="100%" h="350px" bg="blue.500" />
                <Table
                    mt="-15rem" 
                    borderRadius={8}
                    bg="gray.200"
                    w="100%"
                >
                    <Thead>
                        <Tr>
                            <Th>Data</Th>
                            <Th>Valor</Th>
                            <Th>Material</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {flowsIn.map(flowin => (
                            <Tr key={flowin.id}>
                                <Td>{flowin.date}</Td>
                                <Td>{flowin.price}</Td>
                                <Td>{flowin.material}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Flex>
        </Flex>
    )
}