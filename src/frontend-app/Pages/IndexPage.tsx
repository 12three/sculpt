import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { Navigation } from '../Components/Navigation';

export const IndexPage = () => {
  return (
    <Container>
      <Box py={10}>
        <Navigation
          items={[
            ['/blocks', 'Blocks'],
            ['/templates', 'Templates'],
          ]}
        />
      </Box>
    </Container>
  );
};
