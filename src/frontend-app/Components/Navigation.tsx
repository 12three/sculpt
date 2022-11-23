import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Navigation = (props: {
  items: [link: string, name: string][];
}) => {
  return (
    <ul>
      {props.items.map(([link, name], i) => (
        <li key={i}>
          <StyledLink to={link}>{name}</StyledLink>
        </li>
      ))}
    </ul>
  );
};

const StyledLink = styled(Link)`
  display: block;
  color: blue;
  text-decoration: underline;
`;
