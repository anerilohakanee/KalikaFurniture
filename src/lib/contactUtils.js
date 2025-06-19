// In-memory storage for messages (replace with your database)
let contactMessages = [];

// Function to add new message
export function addMessage(messageData) {
  const newMessage = {
    id: Date.now().toString(),
    ...messageData,
    status: 'unread',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  contactMessages.unshift(newMessage);
  return newMessage;
}

// Function to get all messages
export function getMessages(page = 1, limit = 10, status = 'all') {
  let filteredMessages = [...contactMessages];

  // Filter by status
  if (status && status !== 'all') {
    filteredMessages = filteredMessages.filter(msg => msg.status === status);
  }

  // Sort by latest first
  filteredMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedMessages = filteredMessages.slice(startIndex, endIndex);

  const totalMessages = filteredMessages.length;
  const totalPages = Math.ceil(totalMessages / limit);

  return {
    messages: paginatedMessages,
    pagination: {
      page,
      limit,
      totalMessages,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
}

// Function to update message status
export function updateMessageStatus(messageId, status) {
  const messageIndex = contactMessages.findIndex(msg => msg.id === messageId);
  if (messageIndex === -1) {
    return null;
  }

  contactMessages[messageIndex].status = status;
  contactMessages[messageIndex].updatedAt = new Date().toISOString();
  
  return contactMessages[messageIndex];
}

// Function to delete message
export function deleteMessage(messageId) {
  const messageIndex = contactMessages.findIndex(msg => msg.id === messageId);
  if (messageIndex === -1) {
    return false;
  }

  contactMessages.splice(messageIndex, 1);
  return true;
}

// In-memory storage for stores (replace with your database)
let storeLocations = [
  {
    id: 1,
    name: 'Sambhajinagar Store',
    address: 'Ranjangaon Road, Walunj, Pandharpur, Chatrapati Sambhajinagar Maharashtra - 431136',
    phone: '+91 9890602225',
    email: 'mumbai@kalikafurniture.com',
    hours: '9:30 AM - 9:00 PM',
    image: 'https://i.pinimg.com/736x/56/f6/bf/56f6bfb93086524f9cf4bd031e492237.jpg',
    coordinates: {
      lat: 19.8762,
      lng: 75.3433
    },
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Function to get all active stores
export function getStores() {
  return storeLocations.filter(store => store.isActive);
}

// Function to add new store
export function addStore(storeData) {
  const newStore = {
    id: storeLocations.length + 1,
    ...storeData,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  storeLocations.push(newStore);
  return newStore;
}

// Function to update store
export function updateStore(id, updateData) {
  const storeIndex = storeLocations.findIndex(store => store.id === id);
  if (storeIndex === -1) {
    return null;
  }

  storeLocations[storeIndex] = {
    ...storeLocations[storeIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };

  return storeLocations[storeIndex];
}

// Function to delete store (soft delete)
export function deleteStore(id) {
  const storeIndex = storeLocations.findIndex(store => store.id === id);
  if (storeIndex === -1) {
    return false;
  }

  storeLocations[storeIndex].isActive = false;
  storeLocations[storeIndex].updatedAt = new Date().toISOString();
  return true;
} 