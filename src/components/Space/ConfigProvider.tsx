import { createContext } from 'react'
import type { SizeType } from '.'

export interface ConfigContextType {
	size?: SizeType
}

export const ConfigContext = createContext<ConfigContextType>({})
