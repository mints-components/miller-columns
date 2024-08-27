import styled from 'styled-components';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const Container = styled.div`
  display: flex;
`;

export const Column = styled.div`
  flex: 0 0 25%;
`;

export const Item = styled.div<{ $actived: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;

  ${({ $actived }) => $actived && `background-color: #f7f7f7;`}
`;

export const ItemTitle = styled.span``;

export const Loader = styled.div``;

export const End = styled.div``;
