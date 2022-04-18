import { isEmpty } from 'lodash';
import * as React from 'react';
import { DropDownContainer, DropDownHeader, DropDownIcon, DropDownInput } from './ComboBox.styled';

export interface ComboBoxComponentInterface {
  searchIcon: () => JSX.Element | null;
  cancelIcon: () => JSX.Element | null;
  handleInput: (val: string) => void;
  isOpened: boolean;
  openPopover: () => void;
  value: string;
  renderDropdownItems: () => JSX.Element | null;
  onClear: () => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  selected: string;
}

const ComboBoxComponent = React.forwardRef(
  (
    {
      openPopover,
      handleInput,
      searchIcon,
      renderDropdownItems,
      isOpened,
      value,
      cancelIcon,
      onClear,
      onKeyDown,
      selected,
    }: ComboBoxComponentInterface,
    ref,
  ) => {
    const [inputValue, setInputValue] = React.useState(value);

    React.useEffect(() => {
      const timeOutId = setTimeout(() => handleInput(inputValue), 500);
      return () => clearTimeout(timeOutId);
    }, [handleInput, inputValue]);

    React.useEffect(() => {
      setInputValue(value);
    }, [value]);
    return (
      <DropDownContainer onKeyDown={onKeyDown} ref={ref as React.RefObject<HTMLDivElement>}>
        <DropDownHeader onClick={openPopover} isOpened={isOpened}>
          <DropDownIcon>{searchIcon()}</DropDownIcon>
          <DropDownInput
            aria-activedescendant={selected ? `option-${selected}` : ''}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Search"
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            role="textbox"
            aria-label="Search"
            aria-haspopup="false"
            autoFocus
            value={inputValue}
          />
          {!isEmpty(value) ? <DropDownIcon onClick={onClear}>{cancelIcon()}</DropDownIcon> : null}
        </DropDownHeader>
        {renderDropdownItems()}
      </DropDownContainer>
    );
  },
);

export default React.memo(ComboBoxComponent);
