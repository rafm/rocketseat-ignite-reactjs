import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Rafael Maia</Text>
                <Text color="gray.300" fontSize="small">
                    rafael.augusto.fm@outlook.com
                </Text>
            </Box>

            <Avatar size="md" name="Rafael Maia" src="https://github.com/rafm.png" />
        </Flex>
    )
}
