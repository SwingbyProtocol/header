import styled from 'styled-components';

export const Container = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-size: 1em;
  cursor: pointer;
  color: ${({ theme }) => theme.pulsar.color.text.normal};
`;
