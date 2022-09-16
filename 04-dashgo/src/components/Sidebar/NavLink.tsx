import { Icon, Link, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";

interface NavLinkProps extends ChakraLinkProps {
    children: string;
    icon: ElementType;
}

export function NavLink({ children, icon, ...rest }: NavLinkProps) {
    return (
        <Link display="flex" {...rest}>
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">{children}</Text>
        </Link>
    )
}
