import {
  useRef,
  useState,
  useImperativeHandle,
  createContext,
  useContext,
  useEffect,
} from 'react'
import type { CSSProperties, ChangeEvent, PropsWithChildren, Ref } from 'react'
import CopyToClipboard from './components/CopyToClipboard'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <CopyToClipboard
      text="Hello, World!"
      onCopy={() => {
        console.log('done')
      }}
    >
      <div onClick={() => alert(1)}>copy</div>
    </CopyToClipboard>
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
