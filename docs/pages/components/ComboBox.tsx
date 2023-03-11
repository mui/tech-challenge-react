// You have multiple options to add styles:
// emotion
//   import styled from '@emotion/styled';
// CSS modules
//   import styles from './style.module.css'
// JSS
//   import { styled } from '@material-ui/styles';
// styled-components
//   import styled, { css } from 'styled-components';
// Inline style

import { ChangeEvent, FunctionComponent, HTMLAttributes, useCallback, useState } from 'react';
import clsx from 'clsx';
import styles from './style.module.css';

const CLASS_NAME_ROOT = styles.ComboBox;
const CLASS_NAME_INPUT = styles.ComboBoxInput;
const CLASS_NAME_LIST = styles.ComboBoxList;
const CLASS_NAME_LIST_ITEM = styles.ComboBoxListItem;
const CLASS_NAME_SELECTED = styles.selected; // 'selected';
const CLASS_NAME_HIGHLIGHTED = styles.highlighted; // 'highlighted';

// TODO: Use some library, or update target to support string.replaceAll()
function renderHighlightedText(text: string, subSting: string): string {
  // LOL, no .replaceAll() for current target + Node 16.x :)
  // return text.replaceAll(subSting, `<span class="${CLASS_NAME_HIGHLIGHTED}">${subSting}</span>`);

  let result;
  try {
    result = text.replace(
      new RegExp(subSting, 'g'),
      `<span class="${CLASS_NAME_HIGHLIGHTED}">${subSting}</span>`,
    );
  } catch (error) {
    result = text; // For text with ~\./ symbols RegExp may generate the exception
  }
  return result;
}

type ListItems = string[];

interface Props extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string; // Current input value
  list?: ListItems; // List of candidates to be be displayed in the DropDown list
  onChange?: (newValue: string) => string; // More useful event signature with new value as string, developer can override input by returning new value
}

const ComboBox: FunctionComponent<Props> = ({
  className,
  list: propList = [],
  value: propValue = '',
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(propValue); // Current input value
  const [listItems, setListItems] = useState<ListItems>(propList); // Filtered list items according to current input value
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<Number>(-1); // Index of currently selected item in the DropDown list

  // Calls .onChange prop if set, updates .value state, changes content of DropDown list
  const doChange = useCallback(
    (newValue: string) => {
      if (onChange) {
        newValue = onChange(newValue); // Developer can override the input by returning new value
      }
      setInputValue(newValue);
      updateDropDownList(newValue);
    },
    [onChange],
  );

  // Updates content of DropDown list and resets the selection
  const updateDropDownList = useCallback((newValue: string) => {
    let newListItemsToShow;
    if (!newValue) {
      // Use all items from .list prop
      newListItemsToShow = [...propList];
    } else {
      // Filter items from .list prop by new input value
      const newValueLowerCase = newValue.toLowerCase();
      newListItemsToShow = propList.filter((item) =>
        item.toLowerCase().includes(newValueLowerCase),
      );
    }
    setListItems(newListItemsToShow);
    setSelectedIndex(-1); // Also reset selection
  }, []);

  // Called when the User types a text
  // Note: useCallback() is not required here we depends on the `value` state that changes on each key press
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (newValue !== inputValue) {
      setIsDropDownVisible(true); // Something new were typed we need to show DropDown list again
      doChange(newValue);
    }
  };

  // Renders content of DropDown list
  // TODO: Do we need memoizing here?
  // TODO: Do we need separate Component for DropDown list? <DropDownList items={listItems} highlight={inputValue}... />
  function renderDropDownList() {
    if (listItems.length < 1) {
      return null; // TODO: Do we need "hide" the list when there is no items to show?
    }

    return (
      <ul className={CLASS_NAME_LIST}>
        {listItems.map((item, index) => (
          <li
            key={`item-${item}-${index}`}
            className={clsx(
              CLASS_NAME_LIST_ITEM,
              // index === selectedIndex ? CLASS_NAME_SELECTED : undefined,
              index === selectedIndex && CLASS_NAME_SELECTED,
            )}
            dangerouslySetInnerHTML={{ __html: renderHighlightedText(item, inputValue) }}
            // onClick={onItemClick}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className={clsx(className, CLASS_NAME_ROOT)}>
      <input
        className={CLASS_NAME_INPUT}
        type="text"
        value={inputValue}
        onChange={onInputChange}
        // onKeyDown={onKeyDown}
        // onBlur={onBlur}
      />
      {isDropDownVisible && renderDropDownList()}
    </div>
  );
};

export default ComboBox;
