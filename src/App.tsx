import {
	useRef,
	useState,
	useImperativeHandle,
	createContext,
	useContext,
	useEffect,
} from 'react'
import type { CSSProperties, ChangeEvent, PropsWithChildren, Ref } from 'react'
import { Portal } from './components/Portal'
function App() {
	const ref = useRef<HTMLDivElement>(null)

	const content = (
		<div>
			<button onClick={() => console.log(ref.current)}>button</button>
		</div>
	)
	return <Portal ref={ref}>{content}</Portal>
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
