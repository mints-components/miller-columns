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
  justify-content: space-between;
  padding: 4px 12px;
  background-color: ${({ $actived }) => ($actived ? '#f7f7f7' : 'transparent')};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export const ItemInner = styled.div`
  display: flex;
  align-items: center;
`;

export const ItemTitle = styled.span`
  margin-left: 8px;
`;

export const ItemIndicators = styled.span`
  display: table;
  width: 6px;
  height: 6px;
  border-width: 0px 1px 1px 0px;
  border-right-style: solid;
  border-bottom-style: solid;
  border-right-color: rgb(0, 0, 0);
  border-bottom-color: rgb(0, 0, 0);
  border-image: initial;
  border-top-style: initial;
  border-top-color: initial;
  border-left-style: initial;
  border-left-color: initial;
  transform: rotate(-45deg);
`;

export const Title = styled.div``;

export const Loader = styled.div``;

export const End = styled.div``;
