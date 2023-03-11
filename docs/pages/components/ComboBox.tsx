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

import { FunctionComponent, HTMLAttributes, useState } from 'react';
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

interface Props extends HTMLAttributes<HTMLInputElement> {
  value?: string; // Current input value
  list?: string[]; // List of candidates to be be displayed in the DropDown list
}

const ComboBox: FunctionComponent<Props> = ({ className, list = [], value: propValue = '' }) => {
  const [value, setValue] = useState(propValue); // Current input value
  const [selectedIndex, setSelectedIndex] = useState<Number>(-1); // Index of currently selected item in the DropDown list

  // Renders content of DropDown list
  function renderList() {
    return (
      <ul className={`${CLASS_NAME_ROOT}-list`}>
        {list.map((item, index) => (
          <li
            key={`item-${item}-${index}`}
            className={index === selectedIndex ? 'selected' : ''}
            dangerouslySetInnerHTML={{ __html: renderHighlightedText(item, value) }}
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
        value={value}
        // onChange={onChange}
        // onKeyDown={onKeyDown}
        // onBlur={onBlur}
      />
      {renderList()}
    </div>
  );
};

export default ComboBox;
