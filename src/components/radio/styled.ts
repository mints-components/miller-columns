import styled from 'styled-components';

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .radio {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 12px;
    height: 12px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 50%;

    &::after {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -4px;
      margin-left: -4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0;
      transition:
        all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
        opacity 0.1s;
    }

    &.radio-checked {
      &::after {
        background-color: #7497f7;
        opacity: 1;
        transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
      }
    }

    &.radio-disabled {
      background-color: #f1f1f1;
      border-color: #d9d9d9;
      cursor: not-allowed;
    }
  }

  .text {
    margin-left: 8px;
    font-size: 14px;
  }
`;
