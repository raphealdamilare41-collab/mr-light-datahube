import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Mainpage from './Mainpage';

test('starts from the home page flow after the splash screen', () => {
  jest.useFakeTimers();

  render(<App />);
  act(() => {
    jest.advanceTimersByTime(6000);
  });

  expect(screen.getByText(/DataHub/i)).toBeInTheDocument();
  jest.useRealTimers();
});

test('toggles the first dropdown menu when its button is clicked', async () => {
  const user = userEvent.setup();

  render(<Mainpage />);

  const menuItems = screen.getAllByText(/Action/i);
  expect(menuItems[0]).not.toBeVisible();

  await user.click(screen.getAllByRole('button', { name: /dropdown button/i })[0]);

  expect(menuItems[0]).toBeVisible();
});
