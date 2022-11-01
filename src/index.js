"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
require("react-responsive-carousel/lib/styles/carousel.min.css");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
require("./bootstrap.min.css");
const client_2 = require("@apollo/client");
const context_1 = require("@apollo/client/link/context");
const AUTH_TOKEN_KEY = 'auth_token';
const httpLink = new client_2.HttpLink({
    // uri: `http://localhost:3000/shop-api`,
    uri: process.env.REACT_APP_SHOP_API_LINK,
    // @ts-expect-error TS(2345): Argument of type '{ uri: string | undefined; withC... Remove this comment to see the full error message
    withCredentials: true,
});
const afterwareLink = new client_2.ApolloLink((operation, forward) => {
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
const client = new client_2.ApolloClient({
    link: client_2.ApolloLink.from([
        (0, context_1.setContext)(() => {
            const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
            if (authToken) {
                // If we have stored the authToken from a previous
                // response, we attach it to all subsequent requests.
                return {
                    headers: {
                        authorization: `Bearer ${authToken}`,
                    },
                };
            }
        }),
        afterwareLink,
        httpLink,
    ]),
    cache: new client_2.InMemoryCache(),
});
// const client = new ApolloClient({
//     uri: 'https://adminpanel.enjoythed.biz/shop-api',
//     cache: new InMemoryCache(),
// });
// @ts-expect-error TS(2345): Argument of type 'HTMLElement | null' is not assig... Remove this comment to see the full error message
const root = client_1.default.createRoot(document.getElementById('root'));
root.render((0, jsx_runtime_1.jsx)(client_2.ApolloProvider, Object.assign({ client: client }, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) })));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
(0, reportWebVitals_1.default)();
