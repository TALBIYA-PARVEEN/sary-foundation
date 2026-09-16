const brevo = require('@getbrevo/brevo');

const getBrevoClient = () => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || apiKey === 'your_brevo_api_key_here') {
    return null;
  }

  const apiInstance = new brevo.TransactionalEmailsApi();
  const apiKeyAuth = apiInstance.authentications['apiKey'];
  apiKeyAuth.apiKey = apiKey;
  return apiInstance;
};

module.exports = { getBrevoClient };
