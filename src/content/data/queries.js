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