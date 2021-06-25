import { Button, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

export default function Login() {
  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <Flex
        as="form"
        w="100%"
        maxW={500}
        borderRadius={6}
        bgColor="blue.700"
        p="8"
        flexDir="column"
      >
        <Stack>
          <FormControl>
            <FormLabel color="white" htmlFor="email">E-mail</FormLabel>

            <Input
              name="email"
              id="email"
              type="email"
              focusBorderColor="blue.800"
              bgColor="white"
              size="md"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white" htmlFor="password">Senha</FormLabel>

            <Input
              name="password"
              id="password"
              type="password"
              focusBorderColor="blue.800"
              bgColor="white"
              size="md"
            />
          </FormControl>
        </Stack>

        <Button type="submit" mt="5" colorScheme="blue" size="lg">Entrar</Button>
      </Flex>
    </Flex>
      
  )
}
