import { Box, Flex, Text, Button, SimpleGrid, Heading } from '@chakra-ui/react'

import FlowGraphicTotal from '../components/FlowGraphic/FlowGraphicTotal';
import FlowGraphicIn from '../components/FlowGraphic/FlowGraphicIn';
import FlowGraphicOut from '../components/FlowGraphic/FlowGraphicOut';
import PreviewBills from '../components/PreviewBills';
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
    return (
        <Box display="flex" h="100%" maxH="200vh">
            <Sidebar />
            <Flex w="100%" flexDir="column">
                <Box w="100%" h="350px" bgColor="blue.500" px={5} py={5}>
                    <Flex justifyContent="space-between">
                        <Heading color="white">Dashboard</Heading>
                        <Box>
                            <Text fontWeight="bold" color="white">MMCalhas</Text>
                            <Button size="sm" type="button">Logout</Button>
                        </Box>
                    </Flex>
                    
                </Box>
                <SimpleGrid w="80%"  columns={[1, 1, 1, 2]} spacing={[6, 8, 10]} mx="auto" mt="-12rem">
                    <FlowGraphicIn />
                    <FlowGraphicOut />
                    <FlowGraphicTotal />
                    <PreviewBills />
                </SimpleGrid>
            </Flex> 
        </Box>
    )
}