import styled from 'styled-components';

export const Wrapper = styled.div<{ selected: boolean; canExpand: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;

  ${({ canExpand }) =>
    canExpand
      ? `
    cursor: pointer;
    &:hover {
      background-color: #f5f5f7;
    }
    `
      : ''}

  ${({ selected }) => (selected ? 'background-color: #f5f5f7;' : '')}

  & > span.indicator {
    display: table;
    width: 6px;
    height: 6px;
    border: 1px solid #000;
    border-top: 0;
    border-left: 0;
    transform: rotate(-45deg);
  }
`;
