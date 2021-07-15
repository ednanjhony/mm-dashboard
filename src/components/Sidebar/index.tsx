import { Flex, Box, useBreakpointValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import React from "react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import Logo from "../Logo";
import { SidebarNav } from "./SidebarNav";

export default function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer()
  
  const  isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if (isDrawerSidebar) {
    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay>
          <DrawerContent bg="gray.900" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegação</DrawerHeader>

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

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