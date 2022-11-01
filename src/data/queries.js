import { gql } from "@apollo/client";
export const GET_COLLECTIONS = gql `
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
export const GET_PRODUCT = gql `
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
export const ACTIVE_ORDER = gql `
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
export const ADD_ITEM_TO_ORDER = gql `
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
export const REMOVE_ITEM_FROM_ORDER = gql `
    ${ACTIVE_ORDER}
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
export const ADJUST_ORDER_LINE = gql `
    ${ACTIVE_ORDER}
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
export const GET_ACTIVE_ORDER = gql `
    ${ACTIVE_ORDER}
    query GetActiveOrder {
        activeOrder {
            ... ActiveOrder
        }
    }
`;
export const GET_DESIGNS = gql `
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
export const ASSET_FRAGMENT = gql `
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
export const CART_FRAGMENT = gql `
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
    ${ASSET_FRAGMENT}
`;
export const COUNTRY_FRAGMENT = gql `
    fragment Country on Country {
        id
        code
        name
        enabled
    }
`;
export const GET_AVAILABLE_COUNTRIES = gql `
    query GetAvailableCountries {
        availableCountries {
            id
            code
            name
            enabled
        }
    }
`;
export const GET_NEXT_ORDER_STATES = gql `
    query NextOrderStates {
        nextOrderStates
    }
`;
export const ORDER_ADDRESS_FRAGMENT = gql `
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
export const ADDRESS_FRAGMENT = gql `
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
export const ERROR_RESULT_FRAGMENT = gql `
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`;
// checkout
export const GET_SHIPPING_ADDRESS = gql `
    query GetShippingAddress {
        activeOrder {
            id
            shippingAddress {
                ...OrderAddress
            }
        }
    }
    ${ORDER_ADDRESS_FRAGMENT}
`;
export const SET_SHIPPING_ADDRESS = gql `
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
    ${CART_FRAGMENT}
    ${ORDER_ADDRESS_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_ELIGIBLE_SHIPPING_METHODS = gql `
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
export const GET_PRODUCTS_DESIGNS = gql `
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
export const GET_PRODUCT_FEATURED_ASSET = gql `
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
export const SET_SHIPPING_METHOD = gql `
    mutation SetShippingMethod($id: ID!) {
        setOrderShippingMethod(shippingMethodId: $id) {
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const SET_CUSTOMER_FOR_ORDER = gql `
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
    ${ERROR_RESULT_FRAGMENT}
`;
export const TRANSITION_TO_ARRANGING_PAYMENT = gql `
    mutation TransitionToArrangingPayment {
        transitionOrderToState(state: "ArrangingPayment") {
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const TRANSITION_ORDER_STATE = gql `
    mutation TransitionOrderState($input: String!) {
        transitionOrderToState(state: $input) {
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const ADD_PAYMENT = gql `
    mutation AddPayment($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
export const GET_FACET_REDBUBBLE = gql `
    query GetFacetRedbubble {
        facet(id:7){
            values {
                name
                code
            }
        }
    }
`;
