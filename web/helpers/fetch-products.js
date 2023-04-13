import {Session, Shopify} from "@shopify/shopify-api";

export default async function fetchProducts(session) {
    const client = new Shopify.Clients.Graphql(Session?.shop, Session?.accessToken)
}