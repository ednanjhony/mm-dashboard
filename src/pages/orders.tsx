import { Flex, Box, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { api } from '../services/api';

import { useState, useEffect } from 'react'

type Order = { 
    id: number;
    name: string;
    address: string;
    tel: string;
    date: string;
    hour: string;
    situation: string;
    description: string;
 }

export default function Orders() {
    const [ orders, setOrders ] = useState<Order[]>([])

    useEffect(() => {
        api.get('orders')
            .then(response => setOrders(response.data.orders))
    }, []);

    return (
        <Flex>
            <Sidebar />
            <Flex w="100%" flexDir="column">
                <Box w="100%" h="350px" bg="blue.500" />
                <Table mt="-15rem" borderRadius={8} mx="auto" w="80%" maxH={500} px={2} bg="gray.200">
                    <Thead>
                        <Tr>
                            <Th>Cliente</Th>
                            <Th>Endereço</Th>
                            <Th>Tel</Th>
                            <Th>Data</Th>
                            <Th>Horario</Th>
                            <Th>Situação</Th>
                            <Th>Descrição</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map(order => (
                            <Tr key={order.id}>
                                <Td>{order.name}</Td>
                                <Td>{order.address}</Td>
                                <Td>{order.tel}</Td>
                                <Td>{
                                    new Intl.DateTimeFormat('pt-BR')
                                        .format(new Date(order.date)
                                    )}
                                </Td>
                                <Td>{order.hour}</Td>
                                <Td>{order.situation}</Td>
                                <Td>{order.description}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

            </Flex>
        </Flex>
    )
}