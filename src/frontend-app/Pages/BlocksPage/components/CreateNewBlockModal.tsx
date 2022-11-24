import React from 'react';
import {
  Modal,
  ModalOverlay,
  Button,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const CreateNewBlockModal = (props: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string; description: string }>();
  const mutation = useMutation({
    mutationKey: ['blocks'],
    mutationFn: async (payload: { name: string; description: string }) => {
      return fetch('api/blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blocks'] });
    },
  });

  const handleSave = (payload: { name: string; description: string }) => {
    mutation.mutate(payload);
    props.onClose();
    reset();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(handleSave)}>
          <ModalHeader>Create a new block</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                {...register('name', { required: true })}
                placeholder="Name"
                isInvalid={'name' in errors}
                errorBorderColor="red.300"
              />
              <Input
                {...register('description', { required: true })}
                placeholder="Description"
                isInvalid={'description' in errors}
                errorBorderColor="red.300"
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="green" mr={3}>
              Save
            </Button>
            <Button variant="ghost" onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
