import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps, LinkOverlay } from '@chakra-ui/react'
import { ElementType } from 'react'
import { ActiveLink } from '../ActiveLink' 

interface NavLinkProps extends ChakraLinkProps {
    icon: ElementType;
    children: string;
    href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink 
                display="flex" 
                align="center"
                
                _hover={{ 
                    bgGradient: "linear(to-r, blue.500, gray.800)"
                }}
                {...rest}
            >
                <Icon as={icon} fontSize="20" color="gray.100" />
                <Text ml="2" px={1} fontWeight="medium" color="gray.100">{children}</Text>
            </ChakraLink>
        </ActiveLink>
    )
}