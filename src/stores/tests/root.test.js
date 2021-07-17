// @flow

import { destroy as destroyWindow } from '@atomos/atomizer-desktop/client/window'
import { syncStore } from '@atomos/atomizer-desktop/client/stores'
import { autorun } from 'mobx'
import createRootStore from '../root'
import history from '../../history'
import { isElectronApp } from '../../utils'
import { changeLanguage } from '@atomos/atomizer-utils/i18n'

jest.mock('mobx')
jest.mock('@atomos/atomizer-desktop/client/window')
jest.mock('@atomos/atomizer-desktop/client/stores')
jest.mock('@atomos/atomizer-utils/i18n')

jest.mock('../../history', () => ({
  __esModule: true,
  default: {
    push: jest.fn()
  }
}))
jest.mock('../../utils', () => ({
  isElectronApp: jest.fn()
}))

describe('Root store', (): void => {
  describe('When created', (): void => {
    let store

    beforeAll((): void => {
      ;(isElectronApp: any).mockReturnValue(true)
      store = createRootStore()
    })

    it('initializes default properties', (): void => {
      expect(store).toMatchSnapshot()
    })

    it('tells mobx to autorun', (): void => {
      expect(autorun).toHaveBeenCalled()
    })

    it('syncs the store', (): void => {
      expect(syncStore).toHaveBeenCalledWith('Root', store)
    })

    describe('then the autorun is called', (): void => {
      beforeAll((): void => {
        const autorunSideEffect: any = autorun.mock.calls[0][0]
        autorunSideEffect()
      })

      it('changes the i18n language', (): void => {
        expect(changeLanguage).toHaveBeenCalledWith('en')
      })
    })

    describe('then we login', (): void => {
      beforeAll((): void => {
        store.login('Joe Bloggs')
      })

      it('sets authenticated', (): void => {
        expect(store.isAuthenticated).toBe(true)
      })

      it('sets username', (): void => {
        expect(store.userName).toBe('Joe Bloggs')
      })

      it('destroys the login window', (): void => {
        expect(destroyWindow).toHaveBeenCalledWith('login')
      })

      it('navigates to home', (): void => {
        expect(history.push).toHaveBeenCalledWith('/')
      })
    })

    describe('then we set an album', (): void => {
      beforeAll((): void => {
        store.setAlbum(123, {
          id: 123,
          name: 'Discovery'
        })
      })

      it('updates the store', (): void => {
        expect(store.albums).toEqual([{ id: 123, name: 'Discovery' }])
      })
    })

    describe('then we set an artist', (): void => {
      beforeAll((): void => {
        store.setArtist(456, {
          id: 456,
          name: 'Daft Punk'
        })
      })

      it('updates the store', (): void => {
        expect(store.artists).toEqual([{ id: 456, name: 'Daft Punk' }])
      })
    })

    describe('then we add songs', (): void => {
      beforeAll((): void => {
        store.addSongs([
          {
            id: 111,
            title: 'One More Time'
          }
        ])
      })

      it('updates the store', (): void => {
        expect(store.songs).toEqual([{ id: 111, title: 'One More Time' }])
      })
    })

    describe('then we add a song ID to a playlist', (): void => {
      beforeAll((): void => {
        store.addSongIdToPlaylist(1, 111)
      })

      it('updates the store', (): void => {
        expect(store.playlists).toEqual([
          { id: 1, name: 'Liked Songs', songIds: [32861727, 111] }
        ])
      })

      describe('then we remove it', (): void => {
        beforeAll((): void => {
          store.removeSongIdFromPlaylist(1, 111)
        })

        it('updates the store', (): void => {
          expect(store.playlists).toEqual([
            { id: 1, name: 'Liked Songs', songIds: [32861727] }
          ])
        })
      })
    })

    describe('then we set song IDs to play', (): void => {
      beforeAll((): void => {
        store.setSongIdsToPlay([111, 222, 333])
      })

      it('updates the store', (): void => {
        expect(store.songIdsToPlay).toEqual([111, 222, 333])
        expect(store.nowPlayingSongId).toBe(111)
      })
    })
  })
})
