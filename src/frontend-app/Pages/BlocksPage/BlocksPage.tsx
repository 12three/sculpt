import React from 'react';
import {
  Box,
  Container,
  useDisclosure,
  Button,
  Table,
  Thead,
  Tbody,
  Heading,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getBlocks } from '../../api';
import { CreateNewBlockModal } from './components/CreateNewBlockModal';

export const BlocksPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data } = useQuery({
    queryKey: ['blocks'],
    queryFn: getBlocks,
    networkMode: 'always',
  });

  return (
    <Container>
      <CreateNewBlockModal isOpen={isOpen} onClose={onClose} />

      <Box py={10}>
        <Flex>
          <Box flex="1">
            <Heading>Blocks</Heading>
          </Box>
          <Button onClick={onOpen}>Create a new block</Button>
        </Flex>

        <Box pt={10}>
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}

          {data && (
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((block) => (
                    <Tr key={block._id}>
                      <Td>{block.name}</Td>
                      <Td>{block.description}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Container>
  );
};
