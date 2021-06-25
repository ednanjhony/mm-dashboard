import { Box, Text, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react' 

interface NavSectionsProps {
    title: string;
    children: ReactNode;
}

export function NavSection({ title, children }: NavSectionsProps) {
    return (
        <Box>
            <Text color="white" fontWeight="bold">
                {title}
            </Text>
            <Stack spacing="4" mt="8" align="stretch">
                {children}
            </Stack>
        </Box>
        
    )
}