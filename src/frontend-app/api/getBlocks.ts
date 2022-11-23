export const getBlocks = () =>
  fetch('/api/blocks').then((response) => response.json());
