import * as React from 'react';
import { isEmpty } from 'lodash';
import { MenuItem } from '@material-ui/core';
import { DropDownListContainer, DropDownList, ListItem, DropDownIcon } from './ComboBox.styled';
import countries from './countries';
import ComboBoxComponent from './ComboBox';

const SearchIcon = () => (
  <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5
             9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    />
  </svg>
);
const CancelIcon = () => (
  <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export interface OptionsInterface {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
function useOuterClick(callback: () => void) {
  const callbackRef = React.useRef<() => void>();
  const innerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    function handleClick(e: Event) {
      if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target as Node)) {
        callbackRef.current();
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return innerRef;
}

const noResultsUI = (
  <MenuItem>
    <div className="menu-item-text">No Results Found</div>
  </MenuItem>
);

export default function ComboBoxWidget() {
  const [value, setValue] = React.useState('');
  const [filteredOptions, setFilteredOptions] = React.useState<OptionsInterface[]>(countries);
  const [isOpened, setIsOpened] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const ListContainer = React.useRef<HTMLDivElement>(null);

  const closePopover = React.useCallback(() => {
    setIsOpened(false);
    setSelected('');
  }, []);
  const openPopover = React.useCallback(() => setIsOpened(true), []);
  const innerRef = useOuterClick(() => {
    closePopover();
  });
  const onClear = React.useCallback(() => setValue(''), []);
  const onSelectItem = React.useCallback(
    (item: string) => {
      setValue(item);
      closePopover();
    },
    [closePopover],
  );
  const handleInput = React.useCallback((val: string) => {
    setValue(val);
  }, []);

  React.useEffect(() => {
    if (isEmpty(value)) {
      setFilteredOptions(countries);
      setSelected('');

      return;
    }
    const filterFunc = ({ code, label, phone }: { code: string; label: string; phone: string }) =>
      code.toLowerCase().includes(value.toLowerCase()) ||
      label.toLowerCase().includes(value.toLowerCase()) ||
      phone.toLowerCase().includes(value.toLowerCase());

    const items = countries.filter(filterFunc);
    setFilteredOptions(items);
    if (items.length) {
      setSelected(items[0].code);
    }
  }, [value]);

  React.useEffect(() => {
    const selectedOption = ListContainer.current?.querySelector('.selected-option') as HTMLElement;

    if (!selectedOption) return;
    selectedOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selected]);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      event.stopPropagation();
      const getNextOption = () => {
        if (isEmpty(filteredOptions)) {
          return '';
        }
        if (!selected) {
          return filteredOptions[0].code;
        }
        const code = filteredOptions.findIndex((option) => option.code === selected);
        if (code === -1) return '';

        if (code === filteredOptions.length - 1) {
          return filteredOptions[0].code;
        }

        return filteredOptions[code + 1].code;
      };

      const getPreviousOption = () => {
        if (isEmpty(filteredOptions)) {
          return '';
        }
        if (!selected) {
          return filteredOptions[filteredOptions.length - 1].code;
        }
        const code = filteredOptions.findIndex((option) => option.code === selected);
        if (code === -1) return '';

        if (code === 0) {
          return filteredOptions[filteredOptions.length - 1].code;
        }

        return filteredOptions[code - 1].code;
      };
      const key = event.key;
      switch (key) {
        case 'Escape':
        case 'Esc':
          closePopover();
          break;
        case 'Down':
        case 'ArrowDown':
          if (!isOpened) {
            setIsOpened(true);
            break;
          }
          setSelected(getNextOption());
          break;
        case 'Up':
        case 'ArrowUp':
          if (!isOpened) {
            setIsOpened(true);
            break;
          }
          setSelected(getPreviousOption());
          break;
        case 'Enter':
          if (isOpened && selected) {
            const country = countries.find(({ code }) => code === selected)?.label;
            if (country) setValue(country);
            setIsOpened(false);
          }
          break;
        default:
          break;
      }
    },
    [closePopover, filteredOptions, isOpened, selected],
  );
  const renderDropdownItems = React.useCallback(() => {
    if (!isOpened) return null;
    return (
      <DropDownListContainer ref={ListContainer}>
        <DropDownList
          aria-expanded={isOpened ? 'true' : 'false'}
          role="listbox"
          aria-label="States"
        >
          {filteredOptions.length
            ? filteredOptions.map(({ code, label }) => (
                <ListItem
                  className={selected === code ? 'selected-option' : ''}
                  role="option"
                  onClick={() => onSelectItem(label)}
                  key={code}
                  id={`option-${code}`}
                >
                  <DropDownIcon>
                    <img
                      alt={label}
                      loading="lazy"
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code.toUpperCase()}.svg`}
                    />
                  </DropDownIcon>
                  <span>{label}</span>
                </ListItem>
              ))
            : noResultsUI}
        </DropDownList>
      </DropDownListContainer>
    );
  }, [filteredOptions, isOpened, onSelectItem, selected]);
  return (
    <ComboBoxComponent
      openPopover={openPopover}
      handleInput={handleInput}
      renderDropdownItems={renderDropdownItems}
      searchIcon={SearchIcon}
      ref={innerRef}
      isOpened={isOpened}
      value={value}
      cancelIcon={CancelIcon}
      onClear={onClear}
      onKeyDown={onKeyDown}
      selected={selected}
    />
  );
}
