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

type CreateSupplierFormData = {
    name: string;
    material: string;
    tel: string;
}

const createSupplierFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatorio'),
    material: yup.string().required('Material que fornece obrigatorio'),
    tel: yup.string(),
})

export default function AddSupplier() {
    const addSupplier = useMutation(async (supplier: CreateSupplierFormData) => {
        const response = await api.post('suppliers', {
            supplier: { ...supplier }
        })

        return response.data.supplier;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('suppliers')
        }
    });

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createSupplierFormSchema)
    })

    const { errors } = formState

    const handleAddSupplier: SubmitHandler<CreateSupplierFormData> = async (values) => {
        await addSupplier.mutateAsync(values);

        router.push('/suppliers');
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
                    onSubmit={handleSubmit(handleAddSupplier)}
                >
                    <Heading>Cadastrar fornecedor</Heading>

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
                                name="tel"
                                label="Telefone"
                                error={errors.tel}
                                {...register('tel')}
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
                            <Link href="/suppliers" passHref>
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