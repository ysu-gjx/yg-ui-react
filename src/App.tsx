import {
  useRef,
  useState,
  useImperativeHandle,
  createContext,
  useContext,
  useEffect,
} from 'react'
import type { CSSProperties, ChangeEvent, PropsWithChildren, Ref } from 'react'
import MutateObserver from './components/MutateObserver/index'
function App() {
  const ref = useRef<HTMLDivElement>(null)

  const content = (
    <div>
      <button
        onClick={() => {
          const el = document.getElementById('test')
          if (el) {
            el.style.color = 'blue'
            return
          }
          const div = document.createElement('div')
          div.id = 'test'
          div.innerHTML = 'hello world'
          div.style.color = 'red'
          document.body.appendChild(div)
        }}
      >
        button
      </button>
    </div>
  )

  return (
    <MutateObserver
      target="body"
      onMutate={(mutationsList, observer) => {
        console.log(mutationsList, observer)
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.')
          } else if (mutation.type === 'attributes') {
            console.log(
              'The ' + mutation.attributeName + ' attribute was modified.'
            )
          }
        }
      }}
    >
      {content}
    </MutateObserver>
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
