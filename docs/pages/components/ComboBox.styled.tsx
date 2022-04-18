import styled from 'styled-components';

export const DropDownContainer = styled('div')`
  width: 600px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

export const DropDownHeader = styled('div')<{ isOpened: boolean }>`
  margin-bottom: 1px;
  position: relative;
  cursor: pointer;
  height: 50px;
  padding: 0.4em;
  font-weight: 500;
  font-size: 1.3rem;
  background: #ffffff;
  display: flex;
  z-index: 3;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  width: 638px;
  width: auto;
  align-items: center;
  border-bottom-left-radius: ${({ isOpened }) => (isOpened ? '0' : '24px')};
  border-bottom-right-radius: ${({ isOpened }) => (isOpened ? '0' : '24px')};
  box-shadow: ${({ isOpened }) => (isOpened ? '0 1px 6px rgb(32 33 36 / 28%)' : 'none')};
  border-color: ${({ isOpened }) => (isOpened ? 'rgba(223, 225, 229, 0)' : 'none')};

  &:hover {
    box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
    border-color: rgba(223, 225, 229, 0);
  }
  /* &::after {
    background-color: #fff;
    height: 10px;
    content: '';
    position: absolute;
    bottom: -20px;
    left: -20px;
    right: -20px;
    z-index: -1;
  } */
`;
export const DropDownInput = styled('input')`
  flex: 1;
  border: none;
  outline: none;
  &:focus-visible {
    outline-offset: 0px;
  }
`;
export const DropDownIcon = styled('div')`
  height: 20px;
  line-height: 20px;
  width: 20px;
  margin: 0 10px;
`;

export const DropDownListContainer = styled('div')`
  max-height: 600px;
  overflow-y: scroll;
  border: 1px solid #e5e5e5;
  border-top: 0px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 1px 6px rgb(32 33 36 / 28%);
  border-color: rgba(223, 225, 229, 0);
  position: absolute;
  width: 100%;
  background: #fff;
  min-height: 200px;
`;

export const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 14px;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled('li')`
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: black;
  height: 40px;
  padding: 0 1rem;
  &.selected-option {
    background-color: #eee;
  }
  &:hover {
    background-color: #eee;
  }
`;
