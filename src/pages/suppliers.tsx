import { Flex, Box, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import { api } from '../services/api';

import { useState, useEffect } from 'react'

type Supplier = { 
    id: number;
    name: string;
    material: string;
    tel: string;
 }

export default function Suppliers() {
    const [ suppliers, setSuppliers ] = useState<Supplier[]>([])

    useEffect(() => {
        api.get('suppliers')
            .then(response => setSuppliers(response.data.suppliers))
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
                            <Th>Fornecedor</Th>
                            <Th>Material</Th>
                            <Th>Tel</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {suppliers.map(supplier => (
                            <Tr key={supplier.id}>
                                <Td>{supplier.id}</Td>
                                <Td>{supplier.name}</Td>
                                <Td>{supplier.material}</Td>
                                <Td>{supplier.tel}</Td>
                        </Tr>
                        ))}
                    </Tbody>
                </Table>

            </Flex>
        </Flex>
    )
}