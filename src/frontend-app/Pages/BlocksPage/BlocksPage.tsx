import React from 'react';
import {
  Box,
  Container,
  useDisclosure,
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
  Button,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlocks } from '../../api';
import { CreateNewBlockModal } from './components/CreateNewBlockModal';

export const BlocksPage = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data } = useQuery({
    queryKey: ['blocks'],
    queryFn: getBlocks,
    networkMode: 'always',
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return fetch(`/api/blocks/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks'] });
    },
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
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((block) => (
                    <Tr key={block._id}>
                      <Td>{block.name}</Td>
                      <Td>{block.description}</Td>
                      <Td>
                        <Flex justifyContent="end">
                          <Button
                            variant="outline"
                            colorScheme="red"
                            onClick={() => mutation.mutate(block._id)}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </Td>
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
