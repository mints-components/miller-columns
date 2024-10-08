import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  font-family: Roboto, sans-serif;
`;

export const Column = styled.div<{
  $bordered: boolean;
  $borderColor: string;
  $count: number;
  $height?: number;
}>`
  flex: 0 0 ${({ $count }) => 100 / $count}%;
  width: ${({ $count }) => 100 / $count}%;
  height: ${({ $height }) => $height}px;
  border: 1px solid transparent;

  ${({ $bordered, $borderColor }) =>
    $bordered && `border-color: ${$borderColor};`}
  box-sizing: border-box;
  overflow-y: auto;

  & + & {
    border-left: none;
  }
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
