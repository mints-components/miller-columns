import styled from 'styled-components';

export const Container = styled.div<{ count: number; height?: number }>`
  ${({ count }) => `
flex: 0 0 ${100 / count}%;
width: ${100 / count}%;
`}
  ${({ height }) => (height ? `height: ${height}px;` : '')}

  border: 1px solid #dbe4fd;
  box-sizing: border-box;
  overflow-y: auto;

  & + & {
    border-left: none;
  }
`;

export const Loader = styled.div``;

export const Error = styled.div`
  cursor: pointer;
`;
