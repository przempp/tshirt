// @ts-expect-error TS(2304): Cannot find name 'zimport'.
zimport { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    // @ts-expect-error TS(2304): Cannot find name 'render'.
    render(<App>/>););
    const linkElement = (screen as any).getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
