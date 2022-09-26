import {gql} from "@apollo/client";

export const GET_COLLECTIONS = gql`
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
`

export const GET_PRODUCT = gql`
        query GetProduct($slug: String!)  {
            product(slug: $slug) {
                name
                description
                variants {
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
    `

export const ACTIVE_ORDER = gql`
    fragment ActiveOrder on Order {
        id
        code
        state
        couponCodes
        subTotalWithTax
        shippingWithTax
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
        }
    }
`

export const ADD_ITEM_TO_ORDER = gql`
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
`

export const REMOVE_ITEM_FROM_ORDER = gql`
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
`

export const ADJUST_ORDER_LINE = gql`
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
`



export const GET_ACTIVE_ORDER = gql`
    ${ACTIVE_ORDER}
    query GetActiveOrder {
        activeOrder {
            ... ActiveOrder
        }
    }
`

export const GET_DESIGNS = gql`
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
`
