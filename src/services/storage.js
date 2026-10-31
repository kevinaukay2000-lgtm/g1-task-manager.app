/**
 * Storage service for persisting app data using localStorage.
 * API is async to allow for future migration to other storage engines.
 */
const storage = {
  /**
   * Retrieves an item from storage.
   * @param {string} key - The key of the item to retrieve.
   * @returns {Promise<any>} The parsed value or null if not found.
   */
  async getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading key ${key} from storage:`, error);
      return null;
    }
  },

  /**
   * Sets an item in storage.
   * @param {string} key - The key to store the value under.
   * @param {any} value - The value to store.
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing key ${key} to storage:`, error);
    }
  },

  /**
   * Removes an item from storage.
   * @param {string} key - The key to remove.
   * @returns {Promise<void>}
   */
  async removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key ${key} from storage:`, error);
    }
  },

  /**
   * Clears all storage items.
   * @returns {Promise<void>}
   */
  async clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

export default storage;
