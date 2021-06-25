import { Table, Thead, Tr, Tbody, Th, Td, Box, Text } from '@chakra-ui/react';


export default function PreviewBills() {
    return (
        <Table
                maxH="250px"
                bg="gray.200"
                borderRadius={8}
                overflowY="auto"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'blue.500',
                        borderRadius: '24px'
                    },
                }}
            >   
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Nome do Fornecedor</Th>
                        <Th>Valor</Th>
                        <Th>Data</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>1</Td>
                        <Td>Juca</Td>
                        <Td>3000</Td>
                        <Td>02/03/2021</Td>
                    </Tr>
                    <Tr>
                        <Td>1</Td>
                        <Td>Juca</Td>
                        <Td>3000</Td>
                        <Td>02/03/2021</Td>
                    </Tr>
                    <Tr>
                        <Td>1</Td>
                        <Td>Juca</Td>
                        <Td>3000</Td>
                        <Td>02/03/2021</Td>
                    </Tr>
                    <Tr>
                        <Td>1</Td>
                        <Td>Juca</Td>
                        <Td>3000</Td>
                        <Td>02/03/2021</Td>
                    </Tr>
                    <Tr>
                        <Td>1</Td>
                        <Td>Juca</Td>
                        <Td>3000</Td>
                        <Td>02/03/2021</Td>
                    </Tr>
                </Tbody>
            </Table>
    )
}