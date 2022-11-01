import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// @ts-expect-error TS(6142): Module './App' was resolved to '/home/jebaclinuxa/... Remove this comment to see the full error message
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context'


const AUTH_TOKEN_KEY = 'auth_token';


const httpLink = new HttpLink({
    // uri: `http://localhost:3000/shop-api`,
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    uri: process.env.REACT_APP_SHOP_API_LINK,
    // @ts-expect-error TS(2345): Argument of type '{ uri: any; withCredentials: boo... Remove this comment to see the full error message
    withCredentials: true,
});

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const context = operation.getContext();
        const authHeader = context.response.headers.get('vendure-auth-token');
        if (authHeader) {
            // If the auth token has been returned by the Vendure
            // server, we store it in localStorage
            localStorage.setItem(AUTH_TOKEN_KEY, authHeader);
        }
        return response;
    });
});

const client = new ApolloClient({
    link: ApolloLink.from([
        setContext(() => {
            const authToken = localStorage.getItem(AUTH_TOKEN_KEY)
            if (authToken) {
                // If we have stored the authToken from a previous
                // response, we attach it to all subsequent requests.
                return {
                    headers: {
                        authorization: `Bearer ${authToken}`,
                    },
                }
            }
        }),
        afterwareLink,
        httpLink,
    ]),
    cache: new InMemoryCache(),
})


// const client = new ApolloClient({
//     uri: 'https://adminpanel.enjoythed.biz/shop-api',
//     cache: new InMemoryCache(),
// });

// @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ApolloProvider client={client}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <App/>
    </ApolloProvider>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
reportWebVitals();