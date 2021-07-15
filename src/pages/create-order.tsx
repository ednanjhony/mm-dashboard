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

type CreateOrderFormData = {
    name: string;
    address: string;
    tel?: string;
    date: string;
    hour?: string;
    situation: string;
    description?: string;
}

const createOrderFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatorio'),
    address: yup.string().required('Endereço obrigatorio'),
    tel: yup.string(),
    date: yup.date().required('Data é obrigatoria'),
    hour: yup.string(),
    situation: yup.string().required('Situação obrigatoria'),
    description: yup.string()
})

export default function CreateOrder() {
    const createOrder = useMutation(async (order: CreateOrderFormData) => {
        const response = await api.post('orders', {
            order: { ...order }
        })

        return response.data.order;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('orders')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createOrderFormSchema)
    })

    const { errors } = formState

    const handleCreateOrder: SubmitHandler<CreateOrderFormData> = async (values) => {
        await createOrder.mutateAsync(values);

        router.push('/orders');
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
                    h={["650px", "900px"]}
                    mx="auto"
                    mt="-15rem"
                    borderRadius={8}
                    bg="gray.200"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateOrder)}
                >
                    <Heading>Agendar orçamento</Heading>

                    <Divider my="6" borderColor="gray.400" />

                    <VStack spacing="8">
                        <SimpleGrid w="85%" minChildWidth="200px" spacing={["6", "8"]}>
                            <Input
                                name="name"
                                label="Nome do cliente"
                                error={errors.name}
                                {...register('name')}
                            />

                            <Input
                                name="address"
                                label="Endereço do Cliente"
                                error={errors.address}
                                {...register('address')}
                            />
                        </SimpleGrid>
                        <SimpleGrid w="85%" minChildWidth="200px" spacing={["6", "8"]}>
                            <Input
                                name="tel"
                                label="Telefone"
                                error={errors.tel}
                                {...register('tel')}
                            />

                            <Input
                                name="date"
                                label="Prazo maximo"
                                error={errors.date}
                                {...register('date')}
                            />
                        </SimpleGrid>
                        <SimpleGrid w="85%" minChildWidth="200px" spacing={["6", "8"]}>
                            <Input
                                name="hour"
                                label="Periodo que vai ser feito"
                                error={errors.hour}
                                {...register('hour')}
                            />

                            <Input
                                name="situation"
                                label="Situação"
                                error={errors.situation}
                                {...register('situation')}
                            />
                        </SimpleGrid>
                        <SimpleGrid w="85%" minChildWidth="200px" spacing={["6", "8"]}>
                            <Input
                                name="description"
                                label="Descrição"
                                error={errors.description}
                                {...register('description')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="7" justify="center">
                        <HStack spacing="10">
                            <Link href="/orders" passHref>
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