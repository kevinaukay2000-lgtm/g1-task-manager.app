import { useSettingsContext } from '../context/SettingsContext';

/**
 * Custom hook to access settings state and operations.
 */
export function useSettings() {
  return useSettingsContext();
}
