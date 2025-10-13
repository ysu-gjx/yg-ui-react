import React, { useEffect, useMemo, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
	attach?: HTMLElement | string
	ref?: React.Ref<HTMLElement>
}

export function getAttach(attach: PortalProps['attach']) {
	if (typeof attach === 'string') {
		return document.querySelector(attach)
	}

	if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
		return attach
	}

	return document.body
}

export const Portal = (props: React.PropsWithChildren<PortalProps>) => {
	const { attach = document.body, children, ref } = props

	const container = useMemo(() => {
		const el = document.createElement('div')
		el.className = 'portal-wrapper'
		return el
	}, [])

	useEffect(() => {
		const parentElement = getAttach(attach)
		parentElement?.appendChild(container)

		return () => {
			parentElement?.removeChild(container)
		}
	}, [container, attach])

	useImperativeHandle(ref, () => container)

	return createPortal(children, container)
}
