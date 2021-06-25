import { Stack } from '@chakra-ui/react';
import { NavLink } from './NavLink';
import { NavSection } from './NavSection';
import { FiCalendar, FiDollarSign, FiTrendingDown, FiTrendingUp, FiTruck, FiUser } from 'react-icons/fi';


export function SidebarNav() {
    return (
        <Stack spacing="10" align="flex-start">
            <NavSection title="Clientes">
                <NavLink icon={FiUser} href="/orders">Orçamentos</NavLink>
                <NavLink icon={FiCalendar} href="/create-order">Agendar orçamento</NavLink>
            </NavSection>

            <NavSection title="Fornecedores">
                <NavLink icon={FiTruck} href="/suppliers">Lista fornecedores</NavLink>
                <NavLink icon={FiCalendar} href="/add-supplier">Cadastrar fornecedor</NavLink>
            </NavSection>

            <NavSection title="Fluxo">
                <NavLink icon={FiTrendingUp} href="/flow-in">Entradas</NavLink>
                <NavLink icon={FiTrendingDown} href="/flow-out">Saídas</NavLink>
                <NavLink icon={FiDollarSign} href="/flow-total">Total</NavLink>
            </NavSection>

            <NavSection title="Controle de cheque">
                <NavLink icon={FiUser} href="/add-bills">Adicionar cheque</NavLink>
                <NavLink icon={FiUser} href="/bills">Registros</NavLink>
            </NavSection>
        </Stack>
    )
}