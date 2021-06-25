import { Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button } from '@chakra-ui/react';
import * as yup from 'yup';

import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { queryClient } from '../services/queryClient';
import { api } from '../services/api';
import { SubmitHandler } from 'react-hook-form';
import router from 'next/router';

import Sidebar from '../components/Sidebar';
import { Input } from '../components/Input';
import Link from 'next/link';

type CreateBillFormData = {
    name: string;
    price: number;
    date: string;
}

const createBillFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    price: yup.number().required('Valor obrigatório'),
    date: yup.date().required('Data obrigatória')
})

export default function AddBills() {
    const addBill = useMutation(async (bill: CreateBillFormData) => {
        const response = await api.post('bills', {
            bill: { ...bill }
        })

        return response.data.bill;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('bills')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createBillFormSchema)
    })

    const { errors } = formState

    const handleAddBill: SubmitHandler<CreateBillFormData> = async (values) => {
        await addBill.mutateAsync(values);

        router.push('/bills');
    }

    return (
        <Flex>
            <Sidebar />
            <Flex w="100%" flexDir="column">
                <Box w="100%" h="350px" bg="blue.500" />
                <Box
                    as="form"
                    flex="1"
                    w="80%"
                    maxH="650px"
                    mx="auto"
                    mt="-15rem"
                    borderRadius={8}
                    bg="gray.200"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleAddBill)}
                >
                    <Heading>Cadastrar Cheque</Heading>

                    <Divider my="6" borderColor="gray.400" />

                    <VStack spacing="8">
                        <SimpleGrid w="60%" minChildWidth="200px" spacing={["6", "8"]}>
                            <Input
                                name="name"
                                label="Nome do fornecedor"
                                error={errors.name}
                                {...register('name')}
                            />
                        </SimpleGrid>
                        <SimpleGrid w="60%" minChildWidth="200px" spacing={["6", "8"]}>
                            <Input
                                name="price"
                                label="Valor"
                                error={errors.price}
                                {...register('price')}
                            />
                        </SimpleGrid>
                        <SimpleGrid w="60%" minChildWidth="200px" spacing={["6", "8"]}>
                            <Input
                                name="date"
                                label="Data"
                                error={errors.date}
                                {...register('date')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="7" justify="center">
                        <HStack spacing="10">
                            <Link href="/dashboard" passHref>
                                <Button colorScheme="red">Cancelar</Button>
                            </Link>
                            <Button
                                type="submit"
                                colorScheme="green"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}