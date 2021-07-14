import { Table, Thead, Tr, Tbody, Th, Td, Box, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

type Bill = {
    id: number;
    name: string;
    price: number;
    date: Date;
}

export default function PreviewBills() {
    const [bills, setBills] = useState<Bill[]>([]);

    useEffect(() => {
        api.get('bills')
            .then(response => setBills(response.data.bills))
    }, []);

    const currentBills = bills.filter(bill => {
        let today = new Date()
        let currentMonth = (today.getMonth()+1)
        let billDate = new Date(bill.date)
        
        return (currentMonth === (billDate.getMonth()+1))
      })
      
      console.log(currentBills);
      
      if (currentBills) {

        console.log(currentBills)
            return (
                <Table
                        overflow="hidden"
                        maxH="250px"
                        bg="gray.200"
                        fontSize="12px"
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
                            <Tr fontSize="12px">
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
            )
       } else {
        return (
            <Box>
                <Text>Sem registros para esse mês</Text>
            </Box>
        )
       }
    }