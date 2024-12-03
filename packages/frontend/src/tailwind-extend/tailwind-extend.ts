import type { PluginsConfig } from 'tailwindcss/types/config'
import { tsPluginWritingModeVerticalRL } from './plugins/tw-plugin-writing-mode'

export const tailwindPlugins = [
  tsPluginWritingModeVerticalRL,
] satisfies PluginsConfig
