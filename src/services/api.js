// NIRA TOURS & TRAVELS - REST API Service Layer

import { db, hashPassword } from './db';

// Simulate network latency for API calls
const delay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  async signup(data) {
    await delay();
    const users = db.getUsers();
    
    // Email uniqueness check
    const existing = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      passwordHash: hashPassword(data.password),
      role: 'CUSTOMER',
      city: data.city || '',
      country: data.country || 'India',
      createdAt: new Date().toISOString()
    };

    const updated = [...users, newUser];
    db.setUsers(updated);

    // Create welcome notification
    const notifs = db.getNotifications();
    db.setNotifications([
      {
        id: 'notif-' + Date.now(),
        userId: newUser.id,
        title: 'Welcome to Nira Tours & Travels',
        message: 'Your account has been created successfully. Plan your first custom trip today!',
        read: false,
        createdAt: new Date().toISOString()
      },
      ...notifs
    ]);

    const session = { id: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email };
    db.setCurrentSession(session);
    return newUser;
  },

  async login(email, password) {
    await delay();
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    if (user.passwordHash !== hashPassword(password)) {
      throw new Error('Invalid email or password.');
    }

    const session = { id: user.id, role: user.role, name: user.name, email: user.email };
    db.setCurrentSession(session);
    return user;
  },

  async logout() {
    await delay(50);
    db.setCurrentSession(null);
  },

  async getCurrentUser() {
    await delay(50);
    const session = db.getCurrentSession();
    if (!session) return null;
    const users = db.getUsers();
    return users.find(u => u.id === session.id) || null;
  },

  async forgotPassword(email) {
    await delay();
    const users = db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      throw new Error('No account found with this email address.');
    }

    const token = 'rst_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const tokens = db.getResetTokens();
    tokens[token] = { userId: user.id, expiresAt: Date.now() + 3600000 }; // 1 hr
    db.setResetTokens(tokens);

    return { token, email: user.email };
  },

  async resetPassword(token, newPassword) {
    await delay();
    const tokens = db.getResetTokens();
    const record = tokens[token];
    if (!record || record.expiresAt < Date.now()) {
      throw new Error('Invalid or expired password reset token.');
    }

    const users = db.getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === record.userId) {
        return { ...u, passwordHash: hashPassword(newPassword) };
      }
      return u;
    });

    db.setUsers(updatedUsers);
    delete tokens[token];
    db.setResetTokens(tokens);
    return true;
  },

  async updateProfile(userId, profileData) {
    await delay();
    const users = db.getUsers();
    const updatedUsers = users.map(u => {
      if (u.id === userId) {
        const updated = {
          ...u,
          name: profileData.name || u.name,
          phone: profileData.phone || u.phone,
          city: profileData.city !== undefined ? profileData.city : u.city,
          country: profileData.country !== undefined ? profileData.country : u.country
        };
        if (profileData.newPassword) {
          updated.passwordHash = hashPassword(profileData.newPassword);
        }
        return updated;
      }
      return u;
    });

    db.setUsers(updatedUsers);
    return updatedUsers.find(u => u.id === userId);
  }
};

export const tripRequestsAPI = {
  async create(data, currentUser) {
    await delay();
    const reqs = db.getRequests();
    const reqNum = 'OMJ-' + Math.floor(1000 + Math.random() * 9000);

    const newReq = {
      id: 'req-' + Date.now(),
      requestNumber: reqNum,
      userId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: data.phone || currentUser.phone || '',
      destination: data.destination,
      travelType: data.travelType || 'india',
      startDate: data.startDate,
      endDate: data.endDate || '',
      adults: parseInt(data.adults) || 2,
      children: parseInt(data.children) || 0,
      infants: parseInt(data.infants) || 0,
      travelStyle: data.travelStyle || 'Luxury',
      budget: data.budget || "I'll discuss my budget",
      specialRequirements: data.specialRequirements || '',
      status: 'New',
      adminNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.setRequests([newReq, ...reqs]);

    // Initial Status History
    const history = db.getStatusHistory();
    db.setStatusHistory([
      {
        id: 'hist-' + Date.now(),
        tripRequestId: newReq.id,
        oldStatus: null,
        newStatus: 'New',
        changedBy: currentUser.name,
        note: 'Customer submitted initial trip request',
        createdAt: new Date().toISOString()
      },
      ...history
    ]);

    // Customer Notification
    const notifs = db.getNotifications();
    db.setNotifications([
      {
        id: 'notif-' + Date.now(),
        userId: currentUser.id,
        title: `Trip Request Received (${reqNum})`,
        message: `Your trip request for ${data.destination} has been received. Our concierge team is reviewing it.`,
        read: false,
        createdAt: new Date().toISOString()
      },
      ...notifs
    ]);

    return newReq;
  },

  async getByUser(userId) {
    await delay(50);
    const reqs = db.getRequests();
    return reqs.filter(r => r.userId === userId);
  },

  async getById(id) {
    await delay(50);
    const reqs = db.getRequests();
    return reqs.find(r => r.id === id || r.requestNumber === id) || null;
  },

  async getAll(filters = {}) {
    await delay(50);
    let reqs = db.getRequests();

    if (filters.status && filters.status !== 'All') {
      reqs = reqs.filter(r => r.status === filters.status);
    }

    if (filters.search) {
      const s = filters.search.toLowerCase();
      reqs = reqs.filter(r =>
        r.requestNumber.toLowerCase().includes(s) ||
        r.customerName.toLowerCase().includes(s) ||
        r.customerEmail.toLowerCase().includes(s) ||
        r.destination.toLowerCase().includes(s)
      );
    }

    return reqs;
  },

  async updateStatus(id, newStatus, note = '', adminUser = 'Admin') {
    await delay();
    const reqs = db.getRequests();
    let updatedReq = null;

    const newReqs = reqs.map(r => {
      if (r.id === id || r.requestNumber === id) {
        const oldStatus = r.status;
        updatedReq = {
          ...r,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };

        // Record Status History
        const history = db.getStatusHistory();
        db.setStatusHistory([
          {
            id: 'hist-' + Date.now(),
            tripRequestId: r.id,
            oldStatus,
            newStatus,
            changedBy: adminUser,
            note: note || `Status updated to ${newStatus}`,
            createdAt: new Date().toISOString()
          },
          ...history
        ]);

        // Customer Notification
        const notifs = db.getNotifications();
        db.setNotifications([
          {
            id: 'notif-' + Date.now(),
            userId: r.userId,
            title: `Trip Request ${r.requestNumber} Updated`,
            message: `Your trip status for ${r.destination} has been updated to "${newStatus}".`,
            read: false,
            createdAt: new Date().toISOString()
          },
          ...notifs
        ]);

        return updatedReq;
      }
      return r;
    });

    db.setRequests(newReqs);
    return updatedReq;
  },

  async updateNotes(id, adminNotes) {
    await delay(50);
    const reqs = db.getRequests();
    const newReqs = reqs.map(r => {
      if (r.id === id || r.requestNumber === id) {
        return { ...r, adminNotes, updatedAt: new Date().toISOString() };
      }
      return r;
    });
    db.setRequests(newReqs);
    return true;
  }
};

export const quotationsAPI = {
  async getByRequestId(requestId) {
    await delay(50);
    const quotes = db.getQuotations();
    return quotes.find(q => q.tripRequestId === requestId) || null;
  },

  async createOrUpdate(data) {
    await delay();
    const quotes = db.getQuotations();
    const existing = quotes.find(q => q.tripRequestId === data.tripRequestId);

    const subtotal = (data.accommodation || 0) + (data.transport || 0) + (data.activities || 0) + (data.meals || 0) + (data.taxes || 0);
    const totalAmount = Math.max(0, subtotal - (data.discount || 0));

    let updatedQuote;
    if (existing) {
      updatedQuote = {
        ...existing,
        ...data,
        subtotal,
        totalAmount,
        status: data.status || 'Sent',
        updatedAt: new Date().toISOString()
      };
      db.setQuotations(quotes.map(q => q.id === existing.id ? updatedQuote : q));
    } else {
      updatedQuote = {
        id: 'quote-' + Date.now(),
        ...data,
        subtotal,
        totalAmount,
        status: 'Sent',
        createdAt: new Date().toISOString()
      };
      db.setQuotations([updatedQuote, ...quotes]);
    }

    // Automatically update trip request status to 'Quote Sent'
    await tripRequestsAPI.updateStatus(data.tripRequestId, 'Quote Sent', 'Official quotation sent to customer');
    return updatedQuote;
  }
};

export const itinerariesAPI = {
  async getByRequestId(requestId) {
    await delay(50);
    const itins = db.getItineraries();
    return itins.find(i => i.tripRequestId === requestId) || null;
  },

  async createOrUpdate(data) {
    await delay();
    const itins = db.getItineraries();
    const existing = itins.find(i => i.tripRequestId === data.tripRequestId);

    let updated;
    if (existing) {
      updated = { ...existing, ...data, updatedAt: new Date().toISOString() };
      db.setItineraries(itins.map(i => i.id === existing.id ? updated : i));
    } else {
      updated = { id: 'itin-' + Date.now(), ...data, createdAt: new Date().toISOString() };
      db.setItineraries([updated, ...itins]);
    }

    return updated;
  }
};

export const notificationsAPI = {
  async getByUser(userId) {
    await delay(50);
    const notifs = db.getNotifications();
    return notifs.filter(n => n.userId === userId);
  },

  async markAsRead(id) {
    await delay(50);
    const notifs = db.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
    db.setNotifications(updated);
    return true;
  }
};

export const adminAPI = {
  async getCustomers() {
    await delay(50);
    const users = db.getUsers();
    const reqs = db.getRequests();
    
    return users.filter(u => u.role === 'CUSTOMER').map(u => {
      const userReqs = reqs.filter(r => r.userId === u.id);
      return {
        ...u,
        requestsCount: userReqs.length,
        lastRequestDate: userReqs[0]?.createdAt || null
      };
    });
  },

  async getMetrics() {
    await delay(50);
    const reqs = db.getRequests();
    const users = db.getUsers();

    return {
      totalRequests: reqs.length,
      newRequests: reqs.filter(r => r.status === 'New').length,
      underReview: reqs.filter(r => r.status === 'Under Review').length,
      planning: reqs.filter(r => r.status === 'Planning').length,
      quotesSent: reqs.filter(r => r.status === 'Quote Sent').length,
      confirmed: reqs.filter(r => r.status === 'Confirmed').length,
      completed: reqs.filter(r => r.status === 'Completed').length,
      cancelled: reqs.filter(r => r.status === 'Cancelled').length,
      totalCustomers: users.filter(u => u.role === 'CUSTOMER').length
    };
  }
};

export const heroAPI = {
  async getSlides() {
    await delay(50);
    return db.getHeroSlides();
  },

  async saveSlides(slides) {
    await delay();
    db.setHeroSlides(slides);
    return slides;
  }
};
