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

import { ChangeEvent, FunctionComponent, HTMLAttributes, useState } from 'react';
import clsx from 'clsx';

const CLASS_NAME_ROOT = 'ComboBox';
const CLASS_NAME_SELECTED = 'selected';
const CLASS_NAME_HIGHLIGHTED = 'highlighted';

// TODO: Move to utils, use some library, or update target to support string.replaceAll()
export function replaceAll(text: string, find: string, replace: string): string {
  let result;
  try {
    result = text.replace(new RegExp(find, 'g'), replace);
  } catch (error) {
    result = text; // For text with ~\./ symbols RegExp may generate the exception
  }
  return result;
}
// TODO: Move to utils, use some library, or update target to support string.replaceAll()
function renderHighlightedText(text: string, subSting: string) {
  // return text.replaceAll(subSting, `<span class="${CLASS_NAME_HIGHLIGHTED}">${subSting}</span>`); // LOL, no .replaceAll() for current target + Node 16.x
  return replaceAll(text, subSting, `<span class="${CLASS_NAME_HIGHLIGHTED}">${subSting}</span>`);
}

type ListItems = string[];

interface Props extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string; // Current input value
  list?: ListItems; // List of candidates to be be displayed in the DropDown list
  onChange?: (newValue: string) => string; // More useful onChange() event with new value as string, user can override input by returning new value
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

  // Calls .onChange prop if set, also updates the content of DropDown list
  function doChange(newValue: string) {
    if (onChange) {
      newValue = onChange(newValue); // Developer can override the input by returning new value
    }
    setInputValue(newValue);
    updateDropDownList(newValue);
  }

  // Updates matched Suggestions and resets the list selection
  function updateDropDownList(newValue: string) {
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
  }

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
  function renderDropDownList() {
    if (listItems.length < 1) {
      return null; // TODO: Do we need "hide" the list when there is no items to show?
    }

    return (
      <ul className={`${CLASS_NAME_ROOT}-list`}>
        {listItems.map((item, index) => (
          <li
            key={`item-${item}-${index}`}
            className={index === selectedIndex ? 'selected' : ''}
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
        className={`${CLASS_NAME_ROOT}-input`}
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
