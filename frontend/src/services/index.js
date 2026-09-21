import { request } from './api';

export const contactService = {
  submitContact: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  getContacts: (status) => request(`/contact${status ? `?status=${status}` : ''}`),
  updateStatus: (id, status, notes) => request(`/contact/${id}/status`, { method: 'PUT', body: JSON.stringify({ status, notes }) }),
  deleteContact: (id) => request(`/contact/${id}`, { method: 'DELETE' })
};

export const volunteerService = {
  registerVolunteer: (data) => request('/volunteers', { method: 'POST', body: JSON.stringify(data) }),
  getVolunteers: (status, interest) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (interest) params.append('interest', interest);
    return request(`/volunteers${params.toString() ? `?${params.toString()}` : ''}`);
  },
  updateStatus: (id, status) => request(`/volunteers/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  deleteVolunteer: (id) => request(`/volunteers/${id}`, { method: 'DELETE' })
};

export const mediaService = {
  getMedia: (type, category) => {
    const params = new URLSearchParams();
    if (type) params.append('type', type);
    if (category && category !== 'All') params.append('category', category);
    return request(`/media${params.toString() ? `?${params.toString()}` : ''}`);
  },
  createMedia: (data) => request('/media', { method: 'POST', body: JSON.stringify(data) }),
  updateMedia: (id, data) => request(`/media/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMedia: (id) => request(`/media/${id}`, { method: 'DELETE' })
};

export const initiativeService = {
  getInitiatives: () => request('/initiatives'),
  getInitiativeBySlug: (slug) => request(`/initiatives/slug/${slug}`),
  createInitiative: (data) => request('/initiatives', { method: 'POST', body: JSON.stringify(data) }),
  updateInitiative: (id, data) => request(`/initiatives/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteInitiative: (id) => request(`/initiatives/${id}`, { method: 'DELETE' })
};

export const statsService = {
  getStats: () => request('/stats'),
  updateStat: (id, data) => request(`/stats/${id}`, { method: 'PUT', body: JSON.stringify(data) })
};

export const authService = {
  login: (username, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getMe: () => request('/auth/me'),
  updatePassword: (currentPassword, newPassword) => request('/auth/update-password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) })
};

export const donationService = {
  getKey: () => request('/donations/key'),
  createOrder: (data) => request('/donations/create-order', { method: 'POST', body: JSON.stringify(data) }),
  verifyPayment: (data) => request('/donations/verify-payment', { method: 'POST', body: JSON.stringify(data) }),
  getDonations: (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page);
    return request(`/donations${query.toString() ? `?${query.toString()}` : ''}`);
  }
};

