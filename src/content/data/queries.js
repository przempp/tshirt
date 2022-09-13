import {gql} from "@apollo/client";

export const GET_COLLECTIONS = gql`
    query GetProducts {
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
