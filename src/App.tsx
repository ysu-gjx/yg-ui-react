import {
	useRef,
	useState,
	useImperativeHandle,
	createContext,
	useContext,
	useEffect,
} from 'react'
import type { CSSProperties, ChangeEvent, PropsWithChildren, Ref } from 'react'

import { IconAdd } from '@/components/Icon/icons/IconAdd'
import { createFromIconfont } from './components/Icon/createFromIconfont'
import { Icon } from '@/components/Icon/index'
import dayjs from 'dayjs'
import SettingsIcon from '@/assets/svg/settings.svg?react'

const Iconfont = createFromIconfont(
	'//at.alicdn.com/t/c/font_2042259_1fl7yj75s7j.js'
)

const ele = (props: React.SVGAttributes<SVGElement>) => (
	<svg viewBox="0 0 32 32" {...props}>
		<circle cx="16" cy="16" r="14" />
	</svg>
)
function App() {
	const addRef = useRef(null)

	useEffect(() => {
		console.log(addRef.current)
	}, [])

	return (
		<main>
			<Button onClick={() => console.log(addRef.current)} color="red">
				click
			</Button>
			<IconAdd ref={addRef} size="30px" color="red" />
			<Iconfont type="icon-loading" size="40px" spin />
			<Icon component={ele} size="30px" color="blue" />
			<Icon component={SettingsIcon} size="30px" color="red" />
		</main>
	)
}

export default App

type Props = PropsWithChildren<{
	ref?: Ref<HTMLDivElement>
	color: CSSProperties['color']
}>
function Button({ children, ref, color, ...props }: Props) {
	return (
		<div ref={ref} style={{ color }} {...props}>
			{children}
		</div>
	)
}
