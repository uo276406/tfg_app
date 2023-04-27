import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders application', () => {
  render(<App />);
  const titles = screen.findAllByText("Keywords App");
  expect(titles.length > 0)
});
