"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_FACET_REDBUBBLE = exports.ADD_PAYMENT = exports.TRANSITION_ORDER_STATE = exports.TRANSITION_TO_ARRANGING_PAYMENT = exports.SET_CUSTOMER_FOR_ORDER = exports.SET_SHIPPING_METHOD = exports.GET_PRODUCT_FEATURED_ASSET = exports.GET_PRODUCTS_DESIGNS = exports.GET_ELIGIBLE_SHIPPING_METHODS = exports.SET_SHIPPING_ADDRESS = exports.GET_SHIPPING_ADDRESS = exports.ERROR_RESULT_FRAGMENT = exports.ADDRESS_FRAGMENT = exports.ORDER_ADDRESS_FRAGMENT = exports.GET_NEXT_ORDER_STATES = exports.GET_AVAILABLE_COUNTRIES = exports.COUNTRY_FRAGMENT = exports.CART_FRAGMENT = exports.ASSET_FRAGMENT = exports.GET_DESIGNS = exports.GET_ACTIVE_ORDER = exports.ADJUST_ORDER_LINE = exports.REMOVE_ITEM_FROM_ORDER = exports.ADD_ITEM_TO_ORDER = exports.ACTIVE_ORDER = exports.GET_PRODUCT = exports.GET_COLLECTIONS = void 0;
const client_1 = require("@apollo/client");
exports.GET_COLLECTIONS = (0, client_1.gql) `
    query GetCollectons {
        collections(options:{filter: {slug: {contains: "frontpage"} }}) {
            items
            {
                name
                slug
                productVariants {
                    items {
                        product {
                            slug
                            name
                        }
                        price
                        featuredAsset {
                            preview
                        }
                    }
                }
            }
        }
    }
`;
exports.GET_PRODUCT = (0, client_1.gql) `
        query GetProduct($slug: String!)  {
            product(slug: $slug) {
                name
                description
                customFields {
                    redbubbleLink
                }
                variants {
                    facetValues {
                        id
                    }
                    id
                    name
                    price
                    featuredAsset {
                        source
                        preview
                    }
                }
                variantList {
                    totalItems
                }
            }
        }
    `;
exports.ACTIVE_ORDER = (0, client_1.gql) `
    fragment ActiveOrder on Order {
        id
        code
        state
        couponCodes
        subTotalWithTax
        shippingWithTax
        shippingAddress {
            fullName
            company
            streetLine1
            streetLine2
            city
            province
            postalCode
            country
            countryCode
            phoneNumber
            customFields {
                paymentType
                paymentStartDate
                cryptoPrice
            }
        }
        totalWithTax
        totalQuantity
        lines {
            id
            productVariant {
                id
                name
            }
            featuredAsset {
                id
                preview
            }
            quantity
            linePriceWithTax
            customFields {
                backDesign
            }
        }
    }
`;
exports.ADD_ITEM_TO_ORDER = (0, client_1.gql) `
    mutation AddItemToOrder($productVariantId: ID! $quantity: Int!, $backDesign: String!){
        addItemToOrder(
            productVariantId: $productVariantId, 
            quantity: $quantity,
            customFields: {
                backDesign: $backDesign
            }) {
            ...on Order {
                id
                lines {
                    id
                    quantity
                    customFields {
                        backDesign
                    }
                }
            }
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }
`;
exports.REMOVE_ITEM_FROM_ORDER = (0, client_1.gql) `
    ${exports.ACTIVE_ORDER}
    mutation RemoveItemFromOrder($orderLineId: ID!){
        removeOrderLine(orderLineId: $orderLineId) {
            ... ActiveOrder
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }
`;
exports.ADJUST_ORDER_LINE = (0, client_1.gql) `
    ${exports.ACTIVE_ORDER}
    mutation AdjustOrderLine($orderLineId: ID! $quantity: Int!){
        adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity ) {
            ... ActiveOrder
            ... on ErrorResult {
                errorCode
                message
            }
        }
    }
`;
exports.GET_ACTIVE_ORDER = (0, client_1.gql) `
    ${exports.ACTIVE_ORDER}
    query GetActiveOrder {
        activeOrder {
            ... ActiveOrder
        }
    }
`;
exports.GET_DESIGNS = (0, client_1.gql) `
    query GetDesigns {
        collection(id: 16) {
            productVariants {
                items {
                    product {
                        name
                        slug
                        featuredAsset {
                            preview
                        }
                    }
                }
            }
        }
    }
`;
// fragments
exports.ASSET_FRAGMENT = (0, client_1.gql) `
    fragment Asset on Asset {
        id
        width
        height
        name
        preview
        focalPoint {
            x
            y
        }
    }
`;
exports.CART_FRAGMENT = (0, client_1.gql) `
    fragment Cart on Order {
        id
        code
        state
        active
        lines {
            id
            featuredAsset {
                ...Asset
            }
            unitPrice
            unitPriceWithTax
            quantity
            linePriceWithTax
            discountedLinePriceWithTax
            productVariant {
                id
                name
            }
            discounts {
                amount
                amountWithTax
                description
                adjustmentSource
                type
            }
        }
        totalQuantity
        subTotal
        subTotalWithTax
        total
        totalWithTax
        shipping
        shippingWithTax
        shippingLines {
            priceWithTax
            shippingMethod {
                id
                code
                name
                description
            }
        }
        discounts {
            amount
            amountWithTax
            description
            adjustmentSource
            type
        }
    }
    ${exports.ASSET_FRAGMENT}
`;
exports.COUNTRY_FRAGMENT = (0, client_1.gql) `
    fragment Country on Country {
        id
        code
        name
        enabled
    }
`;
exports.GET_AVAILABLE_COUNTRIES = (0, client_1.gql) `
    query GetAvailableCountries {
        availableCountries {
            id
            code
            name
            enabled
        }
    }
`;
exports.GET_NEXT_ORDER_STATES = (0, client_1.gql) `
    query NextOrderStates {
        nextOrderStates
    }
`;
exports.ORDER_ADDRESS_FRAGMENT = (0, client_1.gql) `
    fragment OrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        phoneNumber
    }
`;
exports.ADDRESS_FRAGMENT = (0, client_1.gql) `
    fragment Address on Address {
        id
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
            id
            code
            name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`;
exports.ERROR_RESULT_FRAGMENT = (0, client_1.gql) `
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`;
// checkout
exports.GET_SHIPPING_ADDRESS = (0, client_1.gql) `
    query GetShippingAddress {
        activeOrder {
            id
            shippingAddress {
                ...OrderAddress
            }
        }
    }
    ${exports.ORDER_ADDRESS_FRAGMENT}
`;
exports.SET_SHIPPING_ADDRESS = (0, client_1.gql) `
    mutation SetShippingAddress($input: CreateAddressInput!) {
        setOrderShippingAddress(input: $input) {
            ...Cart
            ...on Order {
                shippingAddress {
                    ...OrderAddress
                }
            }
            ...ErrorResult
        }
    }
    ${exports.CART_FRAGMENT}
    ${exports.ORDER_ADDRESS_FRAGMENT}
    ${exports.ERROR_RESULT_FRAGMENT}
`;
exports.GET_ELIGIBLE_SHIPPING_METHODS = (0, client_1.gql) `
    query GetEligibleShippingMethods {
        eligibleShippingMethods {
            id
            name
            description
            price
            priceWithTax
            metadata
        }
    }
`;
exports.GET_PRODUCTS_DESIGNS = (0, client_1.gql) `
    query GetProductsDesigns {
        collection(id: 16) {
            productVariants {
                items {
                    product {
                        name
                        id
                        slug
                        featuredAsset {
                            preview
                        }
                    }
                }
            }
        }
    }
`;
exports.GET_PRODUCT_FEATURED_ASSET = (0, client_1.gql) `
    query GetProductFeaturedAsset($term: String! $id: [ID!]) {
        search(input: {term: $term, facetValueIds: $id}) {
            items {
                productVariantAsset {
                    preview
                }
            }
        }
    }
`;
exports.SET_SHIPPING_METHOD = (0, client_1.gql) `
    mutation SetShippingMethod($id: ID!) {
        setOrderShippingMethod(shippingMethodId: $id) {
            ...Cart
            ...ErrorResult
        }
    }
    ${exports.CART_FRAGMENT}
    ${exports.ERROR_RESULT_FRAGMENT}
`;
exports.SET_CUSTOMER_FOR_ORDER = (0, client_1.gql) `
    mutation SetCustomerForOrder($input: CreateCustomerInput!) {
        setCustomerForOrder(input: $input) {
            ...on Order {
                id
                customer {
                    id
                    emailAddress
                    firstName
                    lastName
                }
            }
            ...ErrorResult
        }
    }
    ${exports.ERROR_RESULT_FRAGMENT}
`;
exports.TRANSITION_TO_ARRANGING_PAYMENT = (0, client_1.gql) `
    mutation TransitionToArrangingPayment {
        transitionOrderToState(state: "ArrangingPayment") {
            ...Cart
            ...ErrorResult
        }
    }
    ${exports.CART_FRAGMENT}
    ${exports.ERROR_RESULT_FRAGMENT}
`;
exports.TRANSITION_ORDER_STATE = (0, client_1.gql) `
    mutation TransitionOrderState($input: String!) {
        transitionOrderToState(state: $input) {
            ...Cart
            ...ErrorResult
        }
    }
    ${exports.CART_FRAGMENT}
    ${exports.ERROR_RESULT_FRAGMENT}
`;
exports.ADD_PAYMENT = (0, client_1.gql) `
    mutation AddPayment($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
            ...Cart
            ...ErrorResult
        }
    }
    ${exports.CART_FRAGMENT}
    ${exports.ERROR_RESULT_FRAGMENT}
`;
exports.GET_FACET_REDBUBBLE = (0, client_1.gql) `
    query GetFacetRedbubble {
        facet(id:7){
            values {
                name
                code
            }
        }
    }
`;
