import { Flex, Box } from "@chakra-ui/react";
import Logo from "../Logo";
import { SidebarNav } from "./SidebarNav";

export default function Sidebar() {
    return (       
        <Flex
            as="aside"
            w={250}
            h="100vh"
            bg="gray.900"
            flexDir="column"
            align="center"
        >
            <Box mb="10">
                <Logo />
            </Box>

            <SidebarNav />
        </Flex>
    )
}