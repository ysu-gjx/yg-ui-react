import React from 'react'

import { Icon, type IconProps } from './index'

interface CreateIconOptions {
	content: React.ReactNode
	iconProps?: IconProps
	viewBox?: string
}

export function createIcon(options: CreateIconOptions) {
	const { content, viewBox = '0 0 1024 1024', iconProps = {} } = options

	return ({ ref, ...props }: IconProps) => (
		<Icon ref={ref} viewBox={viewBox} {...iconProps} {...props}>
			{content}
		</Icon>
	)
}
