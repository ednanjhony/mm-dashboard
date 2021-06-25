import { Flex, Box, Heading, Divider, VStack, SimpleGrid, HStack, Button, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
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

type CreateFlowInFormData = {
    material: string;
    price: number;
    date: string;
}

const createFlowInFormSchema = yup.object().shape({
    material: yup.string().required('Material que vendeu/instalou'),
    price: yup.number().required('Valor da venda obrigatorio'),
    date: yup.string().required('Data da venda obrigatorio'),
})

export default function FlowIn() {
    const addFlowIn = useMutation(async (flowin: CreateFlowInFormData) => {
        const response = await api.post('flow-total', {
            flowin: { ...flowin }
        })

        return response.data.flowin;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('flow-total')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createFlowInFormSchema)
    })

    const { errors } = formState

    const handleAddFlowIn: SubmitHandler<CreateFlowInFormData> = async (values) => {
        await addFlowIn.mutateAsync(values);

        router.push('/flow-total');
    }

    return (
        <Flex>
            <Sidebar />
            <Flex w="100%" flexDir="column">
                <Box w="100%" h="350px" bg="blue.500" />
                    <Box
                        as="form"
                        w="80%"
                        maxH="650px"
                        mt="-15rem"
                        mx="auto"
                        borderRadius={8}
                        bg="gray.200"
                        p={["6", "8"]}
                        onSubmit={handleSubmit(handleAddFlowIn)}
                    >
                        <Heading>Adicionar entradas</Heading>

                        <Divider my="6" borderColor="gray.400" />

                        <VStack spacing="8">
                            <SimpleGrid w="85%" minChildWidth="200px" spacing={["6", "8"]}>
                                <Input
                                    name="date"
                                    label="Data"
                                    error={errors.date}
                                    {...register('date')}
                                />

                                <Input
                                    name="price"
                                    label="Valor"
                                    error={errors.price}
                                    {...register('price')}
                                />
                            </SimpleGrid>
                            <SimpleGrid w="85%" minChildWidth="200px" spacing={["6", "8"]}>
                                <Input
                                    name="material"
                                    label="Material"
                                    error={errors.material}
                                    {...register('material')}
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