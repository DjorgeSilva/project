// @flow

import { app } from 'electron'
import {
  createDefaultMenu,
  setMenu,
  insertAfter,
  insertBefore,
  insertSubMenuAfter,
  replaceSubMenu
} from '@atomos/atomizer-desktop/menu'
import { isMacOs } from '@atomos/atomizer-desktop/utils'

const Separator = {
  type: 'separator'
}

const fileMenuOptions = [
  Separator,
  {
    label: 'Preferences',
    accelerator: 'CmdOrCtrl+,'
  },
  Separator,
  {
    label: 'Private Session'
  },
  {
    label: 'Offline Mode'
  },
  {
    label: 'Log Out',
    accelerator: 'Shift+CmdOrCtrl+W'
  },
  Separator,
  {
    label: 'Hardware Acceleration',
    type: 'checkbox',
    checked: true
  }
]

let menu = createDefaultMenu()

menu = insertBefore(menu, 'Edit', {
  label: 'File',
  submenu: [
    {
      label: 'New Playlist',
      accelerator: 'CmdOrCtrl+N'
    },
    {
      label: 'New Playlist Folder',
      accelerator: 'Shift+CmdOrCtrl+N'
    }
  ].concat(isMacOs() ? [] : fileMenuOptions)
})

menu = replaceSubMenu(menu, 'View', [
  {
    label: 'Friend Activity',
    type: 'checkbox',
    checked: true
  },
  Separator,
  {
    role: 'resetZoom'
  },
  {
    role: 'zoomIn'
  },
  {
    role: 'zoomOut'
  },
  Separator,
  {
    label: 'Go Back',
    accelerator: 'Option+CmdOrCtrl+Left'
  },
  {
    label: 'Go Forward',
    accelerator: 'Option+CmdOrCtrl+Right'
  },
  Separator,
  {
    label: 'Enter Full Screen',
    accelerator: 'Ctrl+Cmd+F'
  }
])

menu = replaceSubMenu(menu, 'Help', [
  {
    label: 'Spotify Help'
  },
  {
    label: 'Spotify Community'
  },
  {
    label: 'Your Account'
  },
  Separator,
  {
    label: 'Third-party Software'
  }
])

if (isMacOs()) {
  menu = insertSubMenuAfter(menu, 'Spotify', 'About Spotify', fileMenuOptions)
}

menu = insertAfter(menu, 'View', {
  label: 'Playback',
  submenu: [
    {
      label: 'Play',
      accelerator: 'Space'
    },
    Separator,
    {
      label: 'Next',
      accelerator: 'CmdOrCtrl+Right'
    },
    {
      label: 'Previous',
      accelerator: 'CmdOrCtrl+Left'
    },
    {
      label: 'Seek Forward',
      accelerator: 'Shift+CmdOrCtrl+Right'
    },
    {
      label: 'Seek Backward',
      accelerator: 'Shift+CmdOrCtrl+Left'
    },
    Separator,
    {
      label: 'Shuffle',
      type: 'checkbox',
      checked: true,
      accelerator: 'CmdOrCtrl+S'
    },
    {
      label: 'Repeat',
      type: 'checkbox',
      checked: true,
      accelerator: 'CmdOrCtrl+R'
    },
    Separator,
    {
      label: 'Volume Up',
      accelerator: 'CmdOrCtrl+Up'
    },
    {
      label: 'Volume Down',
      accelerator: 'CmdOrCtrl+Down'
    }
  ]
})

setMenu(menu)
