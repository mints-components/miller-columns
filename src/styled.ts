import styled from 'styled-components';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const Container = styled.div`
  display: flex;
  font-family: Roboto, sans-serif;
`;

export const Column = styled.div<{ $count: number; $height?: number }>`
  flex: 0 0 ${({ $count }) => 100 / $count}%;
  width: ${({ $count }) => 100 / $count}%;
  height: ${({ $height }) => $height}px;
  overflow-y: auto;
`;

export const Item = styled.div<{ $actived?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${({ $actived }) => ($actived ? '#f7f7f7' : 'transparent')};
  cursor: pointer;
`;

export const ItemTitle = styled.span`
  margin: 0 4px;
`;

export const Title = styled.div``;

export const Loader = styled.div``;

export const End = styled.div``;
