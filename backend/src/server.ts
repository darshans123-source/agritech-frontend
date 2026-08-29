import app from './app.js';
import { ENV } from './config/env.js';

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🌾 KRISHISMART AI - BACKEND REST API SERVER 🌾`);
  console.log(`==================================================`);
  console.log(`🚀 Server running in ${ENV.NODE_ENV} mode on port: ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🩺 Health Check: http://localhost:${PORT}/health`);
  console.log(`🌐 Allowed Client: ${ENV.CLIENT_URL}`);
  console.log(`==================================================`);
});
