import { render, screen, cleanup } from '@testing-library/react'

import Navbar from '../Navbar'

test('should return card shop component', () => {
    render(<Navbar/>);
    const navbarElement = screen.getByTestId('Navbar-test');
    expect(navbarElement).toBeInTheDocument();
  

})