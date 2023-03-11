import React, {
  ChangeEvent,
  FunctionComponent,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import useId from '@material-ui/core/utils/useId';
import styles from './style.module.css';

/**
 * @component ComboBox
 */
const CLASS_NAME_ROOT = styles.ComboBox;
const CLASS_NAME_INPUT = styles.ComboBoxInput;
const CLASS_NAME_LIST = styles.ComboBoxList;
const CLASS_NAME_LIST_ITEM = styles.ComboBoxListItem;
const CLASS_NAME_SELECTED = styles.selected; // 'selected';
const CLASS_NAME_HIGHLIGHTED = styles.highlighted; // 'highlighted';

const SELECTED_INDEX_DEFAULT = -1; // No selection
// const SELECTED_INDEX_DEFAULT = 0; // Preselect first item

type ListItems = string[];

interface Props extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  list?: ListItems;
  onChange?: (newValue: string) => string; // More useful event signature with new value as string, developer can override input by returning new value
}

// TODO: Use some library, or update target to support string.replaceAll()
function renderHighlightedText(text: string, subSting: string): string {
  // LOL, no .replaceAll() for current target + Node 16.x :)
  // return text.replaceAll(subSting, `<span class="${CLASS_NAME_HIGHLIGHTED}">${subSting}</span>`);

  let result;
  try {
    result = text.replace(
      // TODO: BUG: uNy -> uNited States, AM -> AMerican SAMoa
      new RegExp(subSting, 'ig'),
      `<span class="${CLASS_NAME_HIGHLIGHTED}">${subSting}</span>`,
    );
  } catch (error) {
    result = text; // RegExp may generate the exception
  }
  return result;
}

/**
 * Renders ComboBox component with DropDown list
 * @component ComboBox
 * @prop  {string} [value] - Initial Text input value
 * @prop {string[]} [list] - List of candidates to be be displayed in the DropDown list
 * @prop {function} [onChange] - Developer can override Input Changes by returning new value
 */
const ComboBox: FunctionComponent<Props> = ({
  className,
  id: propId, // We need pass the .id prop to wrapper component
  list: propList = [],
  value: propValue = '',
  onChange,
  ...restOfProps
}) => {
  const id = useId(); // NOTE: We use old React here, so this hook is form MUI
  const [inputValue, setInputValue] = useState<string>(propValue);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [listItems, setListItems] = useState<ListItems>(propList); // Filtered list of items matching to current input value
  const [selectedIndex, setSelectedIndex] = useState<number>(SELECTED_INDEX_DEFAULT); // Index of currently selected item in the DropDown list

  const updateDropDownList = useCallback(
    (newValue: string) => {
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
      setSelectedIndex(SELECTED_INDEX_DEFAULT); // Also reset selection
    },
    [propList],
  );

  useEffect(
    () => {
      updateDropDownList(propValue); // The DropDown list must respect .value prop on component mounting
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const doChange = useCallback(
    (newValue: string) => {
      if (onChange) {
        newValue = onChange(newValue) ?? newValue; // Developer can override the input by returning new value
      }
      setInputValue(newValue);
      updateDropDownList(newValue);
    },
    [onChange, updateDropDownList],
  );

  // Called when the User types a text
  // Note: useCallback() is not required here we depends on the `inputValue` state that changes on each key press
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (newValue !== inputValue) {
      setIsDropDownVisible(true); // Something new were typed we need to show DropDown again
      doChange(newValue);
    }
  };

  // Called when User clicks outside the component, also by Tab key
  const onInputBlur = useCallback(() => {
    setIsDropDownVisible(false); // Hide the DropDown list when the Text input loosing focus
  }, []);

  // Tracks Esc, Enter, Tab, Space and Arrow keys
  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      let newSelectedIndex = selectedIndex;

      switch (event.key) {
        case 'ArrowUp':
          if (!isDropDownVisible) {
            setIsDropDownVisible(true);
            return; // Only open DropDown on first press
          }
          newSelectedIndex -= 1; // Select Previous item
          break;

        // case 'Tab': // TODO: Google uses Tab for selection next item, I think tabStops is used for navigation...
        case 'ArrowDown':
          if (!isDropDownVisible) {
            setIsDropDownVisible(true);
            return; // Only open DropDown on first press
          }
          newSelectedIndex += 1; // Select Next item
          break;

        case 'Escape':
          setIsDropDownVisible(false);
          setSelectedIndex(SELECTED_INDEX_DEFAULT); // TODO: Do we need to reset selection?
          return;

        case 'Enter': // Note: Tests require event.preventDefault() on eny Enter press, but it is not correct...
        case ' ': // Space pressed
          if (!isDropDownVisible) {
            setIsDropDownVisible(true);
            return; // Only open DropDown on first press
          }

          if (selectedIndex >= 0 && selectedIndex < listItems.length) {
            // Use currently selected Item as new value
            event.preventDefault();
            const newValue = listItems[selectedIndex];
            doChange(newValue);
          }
          return;

        default:
          break; // Required by linter
      }

      // Select new item in the DropDown list
      if (newSelectedIndex > listItems.length - 1) {
        newSelectedIndex = 0; // Looping to first item
      }
      if (newSelectedIndex < 0) {
        newSelectedIndex = listItems.length - 1; // Looping to last item
      }
      setSelectedIndex(newSelectedIndex);
      setIsDropDownVisible(true);
    },
    [isDropDownVisible, listItems, selectedIndex, doChange],
  );

  // Called when the User clicks the Item in DropDown list
  // Note: useCallback() is not required here we depends on the `inputValue` state that changes on each key press
  const onListItemClick = (event: MouseEvent<HTMLElement>) => {
    const newValue = event.currentTarget.innerText;
    if (newValue !== inputValue) {
      setInputValue(newValue);
      setIsDropDownVisible(false);
    }
  };

  // Renders content of the DropDown list
  // TODO: Do we need memoizing here?
  // TODO: Do we need separate Component for DropDown list? <DropDownList items={listItems} highlight={inputValue}... />
  function renderDropDownList() {
    if (listItems.length < 1) {
      return null; // TODO: Do we need "hide" the list when there is no items to show?
    }

    return (
      <div className={CLASS_NAME_LIST}>
        {listItems.map((item, index) => (
          <div
            key={`item-${item}-${index}`}
            aria-label={item}
            aria-selected={index === selectedIndex}
            className={clsx(CLASS_NAME_LIST_ITEM, index === selectedIndex && CLASS_NAME_SELECTED)}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: renderHighlightedText(item, inputValue) }}
            id={`${id}-item-${index}`}
            role="option"
            tabIndex={index}
            onClick={onListItemClick}
            onKeyDown={onInputKeyDown} // Required by linter
          />
        ))}
      </div>
    );
  }

  return (
    <div className={clsx(CLASS_NAME_ROOT, className)} id={propId}>
      <input
        aria-activedescendant={selectedIndex >= 0 ? `${id}-item-${selectedIndex}` : undefined}
        className={CLASS_NAME_INPUT}
        // role="textbox" // Not allowed by linter :)
        type="text"
        value={inputValue}
        onBlur={onInputBlur}
        onChange={onInputChange}
        onKeyDown={onInputKeyDown}
        {...restOfProps} // All other HTMLInputElement props passed here
      />
      {isDropDownVisible && renderDropDownList()}
    </div>
  );
};

export default ComboBox;
