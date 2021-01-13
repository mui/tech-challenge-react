import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, fireEvent, screen } from 'test/utils';
import { spy } from 'sinon';
import ComboBox from './ComboBox.tsx';

/**
 * You can run these tests with `yarn t ComboBox`.
 */
describe('<ComboBox />', () => {
  const render = createClientRender();

  it('should prevent the default event handlers', () => {
    const handleSubmit = spy();
    const handleChange = spy();
    const { getAllByRole } = render(
      <div
        onKeyDown={(event) => {
          if (!event.defaultPrevented && event.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        {/* The ComboBox component here */}
        <ComboBox onChange={handleChange} />
      </div>,
    );

    const textbox = screen.getByRole('textbox');

    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // open the popup
    fireEvent.keyDown(textbox, { key: 'ArrowDown' }); // focus the first option
    const options = getAllByRole('option');
    expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id'));

    fireEvent.keyDown(textbox, { key: 'Enter' }); // select the first option
    expect(handleSubmit.callCount).to.equal(0);
    expect(handleChange.callCount).to.equal(1);
  });
});
