import type { PluginCreator } from 'tailwindcss/types/config'

export const tsPluginWritingModeVerticalRL: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    '.writing-vertical-rl': {
      'writing-mode': 'vertical-rl',
      'text-orientation': 'mixed',
    },
  })
}
