import { Heading, Text, Link } from "@chakra-ui/react";


export default function Logo() {
    return (
        <Link href="/dashboard">
            <Heading size="md" color="white" textAlign="center" mx="auto" mt="10">
                <Text color="blue.500">MM</Text>Calhas
            </Heading>
        </Link>
    )
}