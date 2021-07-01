import { Flex, Box, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { api } from '../services/api';

import { useState, useEffect } from 'react'

type Bill = { 
    id: number;
    name: string;
    price: number;
    date: Date;
 }

export default function Bills() {
    const [ bills, setBills ] = useState<Bill[]>([])

    useEffect(() => {
        api.get('bills')
            .then(response => setBills(response.data.bills))
    }, []);

    return (
        <Flex>
            <Sidebar />
            <Flex w="100%" flexDir="column">
                <Box w="100%" h="350px" bg="blue.500" />
                <Table mt="-15rem" borderRadius={8} mx="auto" w="80%" maxH={500} px={2} bg="gray.200">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Nome do Fornecedor</Th>
                            <Th>Valor</Th>
                            <Th>Data</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bills.map(bill => (
                            <Tr key={bill.id}>
                                <Td>{bill.id}</Td>
                                <Td>{bill.name}</Td>
                                <Td>{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(bill.price)}</Td>
                                <Td>{new Intl.DateTimeFormat('pt-BR').format(new Date(bill.date))}</Td>
                        </Tr>
                        ))}
                    </Tbody>
                </Table>

            </Flex>
        </Flex>
    )
}