🧩 What Is Unleash?
Unleash is an open-source feature flag system that enables dynamic control over application behavior without requiring code changes or redeployments.
🔧 Key Use Cases
- Feature toggling: Enable/disable features in real time
- Gradual rollouts: Release features to a subset of users
- A/B testing: Compare feature variants for performance
- Kill switches: Instantly disable unstable features
- Environment targeting: Customize behavior per environment
Unleash supports SDKs for multiple platforms and integrates easily with CI/CD pipelines, making it ideal for scalable and flexible software delivery.

🛠️ Setting Up Unleash for a Local React Application
1. 🧱 Prerequisites
- Node.js and npm installed
- A React application (e.g., created via create-react-app)
- Docker (optional, for running Unleash locally)

2. 🐳 Running Unleash Locally (via Docker)
You can run the Unleash server locally using Docker:
docker run -p 4242:4242 \
  -e DATABASE_URL="postgres://unleash_user:password@localhost:5432/unleash" \
  -e DATABASE_SSL=false \
  unleashorg/unleash-server


💡 You’ll need a PostgreSQL instance running locally. Alternatively, use the Unleash hosted version or Docker Compose setup from Unleash GitHub.

3. ⚙️ Install Unleash Client SDK
For React, use the unleash-proxy-client:
npm install @unleash/proxy-client-react



4. 🔌 Configure Unleash Proxy
To connect your React app to Unleash, you’ll need to set up the Unleash Proxy (recommended for frontend apps):
Option A: Use Hosted Proxy
- If using Unleash SaaS, you can enable the proxy from the dashboard.
Option B: Run Proxy Locally
docker run -p 3000:3000 \
  -e UNLEASH_URL=http://localhost:4242/api \
  -e UNLEASH_API_TOKEN=your-api-token \
  -e UNLEASH_PROXY_CLIENT_KEYS=frontend-proxy-key \
  unleashorg/unleash-proxy

5. 🧩 Integrate Unleash in React
a. Initialize the SDK
// src/unleash.ts
import { UnleashClient } from '@unleash/proxy-client-react';

export const unleash = new UnleashClient({
  url: 'http://localhost:3000/proxy',
  clientKey: 'frontend-proxy-key',
  appName: 'my-react-app',
  environment: 'development',
});


b. Wrap Your App with Provider
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UnleashProvider } from '@unleash/proxy-client-react';
import { unleash } from './unleash';

unleash.start();

ReactDOM.render(
  <UnleashProvider unleashClient={unleash}>
    <App />
  </UnleashProvider>,
  document.getElementById('root')
);

6. 🧪 Use Feature Toggles in Components
import { useFlag } from '@unleash/proxy-client-react';

const MyComponent = () => {
  const isNewFeatureEnabled = useFlag('new-awesome-feature');

  return (
    <div>
      {isNewFeatureEnabled ? <NewFeature /> : <OldFeature />}
    </div>
  );
};



7. 🛠️ Creating Feature Toggles
- Go to the Unleash dashboard (http://localhost:4242)
- Create a new feature toggle (e.g., new-awesome-feature)
- Assign it to your environment and strategy (e.g., default, userId, etc.)

📌 Tips for Local Development
- Use default strategy for simple toggling
- Enable context for user-specific toggles (e.g., userId, sessionId)
- Use environment variables to switch between dev/staging/prod Unleash endpoints
