import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import './bootstrap.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

const AUTH_TOKEN_KEY = 'auth_token';

const httpLink = new HttpLink({
    // uri: `http://localhost:3000/shop-api`,
    uri: `https://adminpanel.enjoythed.biz/shop-api`,
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>

    <App />
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
