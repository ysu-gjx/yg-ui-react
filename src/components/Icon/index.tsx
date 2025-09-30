import React, { type PropsWithChildren } from 'react'
import cs from 'classnames'

import './index.scss'

type BaseIconProps = {
	className?: string
	style?: React.CSSProperties
	size?: string | string[]
	spin?: boolean
	ref?: React.Ref<SVGSVGElement>
	component?: React.ComponentType<IconProps | React.SVGProps<SVGSVGElement>>
}

export const getSize = (size: BaseIconProps['size']) => {
	if (Array.isArray(size) && size.length === 2) {
		return size as string[]
	}

	const width = (size as string) || '1em'
	const height = (size as string) || '1em'
	return [width, height]
}

export type IconProps = BaseIconProps &
	Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

export const Icon = (props: PropsWithChildren<IconProps>) => {
	const {
		style,
		className,
		spin,
		size = '1em',
		children,
		ref,
		component: Component,
		...rest
	} = props

	const [width, height] = getSize(size)

	const cn = cs('icon', {
		'icon-spin': spin,
		className,
	})

	if (Component) {
		return (
			<Component
				ref={ref}
				className={cn}
				style={style}
				width={width}
				height={height}
				fill="currentColor"
				{...rest}
			>
				{children}
			</Component>
		)
	}

	return (
		<svg
			ref={ref}
			className={cn}
			style={style}
			width={width}
			height={height}
			fill="currentColor"
			{...rest}
		>
			{children}
		</svg>
	)
}

Icon.displayName = 'Icon'
