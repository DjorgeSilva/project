// @flow

import { syncStore as syncDesktopStore } from '@atomos/atomizer-desktop/client/stores'

/**
 * Syncs the store with other desktop windows
 * @param {string} storeName The name of the store
 * @param {store} store The store.
 * @return {void}
 */
export function syncStore(storeName: string, store: any): void {
  syncDesktopStore(storeName, store)
}
