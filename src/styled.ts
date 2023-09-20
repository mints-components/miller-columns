import styled from 'styled-components';

export const Checkbox = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  .checkbox {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 14px;
    height: 14px;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;

    &::after {
      content: ' ';
      position: absolute;
      top: 50%;
      left: 16%;
      display: table;
      width: 4px;
      height: 8px;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(0) translate(-50%, -50%);
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }

    &.checkbox-checked {
      border-color: #292b3f;
      background-color: #292b3f;

      &::after {
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        opacity: 1;
      }
    }

    &.checkbox-indeterminate {
      background-color: #fff;
      border-color: #d9d9d9;

      &::after {
        left: 50%;
        width: 10px;
        height: 10px;
        background-color: #292b3f;
        border: 0;
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    &.checkbox-disabled {
      background-color: #f1f1f1;
      border-color: #d9d9d9;
      cursor: not-allowed;

      &::after {
        border-color: rgb(0 0 0 / 25%);
      }
    }
  }

  .text {
    margin-left: 8px;
    font-size: 14px;
  }
`;
