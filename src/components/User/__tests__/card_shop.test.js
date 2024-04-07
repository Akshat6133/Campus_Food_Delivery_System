import { render, screen, cleanup } from '@testing-library/react'

import Card_shop from '../card_shop'

test('should return card shop component', () => {
    render(<Card_shop/>);
    const cardElement = screen.getByTestId('card-test')
    expect(cardElement).toBeInTheDocument();
  

})