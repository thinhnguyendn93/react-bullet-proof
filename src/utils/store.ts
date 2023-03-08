import { MINIMUM_SIZE_PANE } from 'config/constant';

export function setSessionStorage(key: string, value: any): any {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
  }
}

export function setLocalStorage(key: string, value: any): any {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
  }
}

export function getSessionStorage(key: string): any {
  if (typeof window !== 'undefined') {
    const value = window.sessionStorage.getItem(key);
    try {
      if (value) {
        return JSON.parse(value);
      }
      return value;
    } catch (e) {
      // handle error
    }
    return value;
  }
  return null;
}

export function getLocalStorage(key: string): any {
  if (typeof window !== 'undefined') {
    const value = window.localStorage.getItem(key);
    try {
      if (value) {
        return JSON.parse(value);
      }
      return value;
    } catch (e) {
      // handle error
    }
    return value;
  }
  return null;
}

export function removeSessionStorage(key: string): void {
  if (typeof window !== 'undefined') {
    window.sessionStorage.removeItem(key);
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(key);
  }
}

export function clearAllSessionStorage(): void {
  if (typeof window !== 'undefined') {
    window.sessionStorage.clear();
  }
}

export function clearAllLocalStorage(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
  }
}

export const setLastLocation = (location: string) =>
  setSessionStorage('lastLocation', location);

export const getLastLocation = (): string =>
  getSessionStorage('lastLocation') || '';

export const setPermissions = (permissions: string[]) =>
  setLocalStorage('permissions', permissions);

export const getPermissions = (): string[] => getLocalStorage('permissions');

export function getPanesStorage(pane: string) {
  const panes = getLocalStorage('splitter-panes') || {};
  return Math.max(panes[pane], MINIMUM_SIZE_PANE);
}

export function setPanesStorage(pane: string, size: number) {
  const panes = getLocalStorage('splitter-panes') || {};
  setLocalStorage('splitter-panes', {
    ...panes,
    [pane]: Math.max(size, MINIMUM_SIZE_PANE),
  });
}

export function getCollapsePaneStorage(pane: string) {
  const panes = getLocalStorage('splitter-collapse') || {};
  return panes[pane];
}

export function setPaneCollapseStorage(pane: string, collapse: boolean) {
  const panes = getLocalStorage('splitter-collapse') || {};
  setLocalStorage('splitter-collapse', {
    ...panes,
    [pane]: collapse,
  });
}
