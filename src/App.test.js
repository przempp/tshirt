"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error TS(2304): Cannot find name 'zimport'.
zimport;
{
    render, screen;
}
from;
'@testing-library/react';
test('renders learn react link', () => {
    // @ts-expect-error TS(2304): Cannot find name 'render'.
    render(/>);););
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
