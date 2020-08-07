import React from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { Provider, createClient, defaultExchanges, subscriptionExchange } from "urql";
  
const host = 'react.eogresources.com';

const subscriber = new SubscriptionClient(`wss://${host}/graphql`,
    { reconnect: true, timeout: 20000 }
);

const client = createClient({
    url: `https://${host}/graphql`,
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription: op => subscriber.request(op)
      })
    ]
});
  
export default (props) => {
    return (
        <Provider value={client}>
            {props.children}
        </Provider>
    )
};