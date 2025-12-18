// src/utils/common/redis-lock.js

// --- MOCK REDIS (In-Memory Simulation) ---
// We use this because a real Redis server is not running on your laptop.

const mockRedisStore = new Map();

async function acquireLock(key, ttlSeconds) {
    // 1. Check if key exists (Simulates Redis GET)
    if (mockRedisStore.has(key)) {
        return false; // Lock is already taken by someone else
    }

    // 2. Set the lock (Simulates Redis SET NX)
    mockRedisStore.set(key, "LOCKED");

    // 3. Automatically expire the lock after TTL (Simulates Redis EX)
    setTimeout(() => {
        mockRedisStore.delete(key);
    }, ttlSeconds * 1000);

    return true; // Lock acquired successfully
}

async function releaseLock(key) {
    mockRedisStore.delete(key);
}

module.exports = {
    acquireLock,
    releaseLock
};