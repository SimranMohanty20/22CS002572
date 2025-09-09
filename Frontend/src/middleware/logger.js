export const logEvent = (eventType, payload) => {
  const timestamp = new Date().toISOString();
  const logEntry = { eventType, payload, timestamp };
  console.log('Custom Log:', JSON.stringify(logEntry));
};