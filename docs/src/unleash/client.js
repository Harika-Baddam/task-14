import { UnleashClient } from 'unleash-client';

const client = new UnleashClient({
  url: 'http://localhost:4242/api/frontend',
  clientKey: '<your-client-key>',
  appName: 'my-react-app',
});

client.start();
export default client;