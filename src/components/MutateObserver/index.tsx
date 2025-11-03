import React, { useLayoutEffect } from 'react'
import useMutateObserver from './useMutateObserver'

// 支持的 target 类型：
// - 不传：监听被包裹的 children
// - string：选择器，用于 document.querySelector
// - HTMLElement：直接传入元素
// - React.RefObject<HTMLElement>
interface MutationObserverProps {
  options?: MutationObserverInit
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void
  children: React.ReactElement
  target?: string | HTMLElement | React.RefObject<HTMLElement> | null
}

const isRefObject = (v: unknown): v is React.RefObject<HTMLElement> =>
  typeof v === 'object' && v !== null && 'current' in v

const MutateObserver: React.FC<MutationObserverProps> = (props) => {
  const {
    options,
    onMutate = () => {},
    children,
    target: propTarget = null,
  } = props

  const elementRef = React.useRef<HTMLElement | null>(null)

  const [target, setTarget] = React.useState<HTMLElement | null>(null)

  // 将 propTarget 或内部 ref 解析为最终要监听的 HTMLElement
  useLayoutEffect(() => {
    if (!propTarget) {
      setTarget(elementRef.current)
      return
    }

    if (typeof propTarget === 'string') {
      setTarget(document.querySelector(propTarget) as HTMLElement | null)
      return
    }

    if (isRefObject(propTarget)) {
      setTarget(propTarget.current)
      return
    }

    setTarget(propTarget)
  }, [propTarget])

  useMutateObserver(target, onMutate, options)

  if (!children) return null

  // 合并 ref：如果 children 已有 ref，需要保留，并把 elementRef 也赋值
  const child = React.Children.only(children) as React.ReactElement

  // 直接传入内部 ref，保持实现简单并兼容原有使用方式。
  // 局部断言：把 child 视为拥有可扩展 props 的 React 元素，然后注入 ref
  const el = child as unknown as React.ReactElement<Record<string, unknown>>
  const propsWithRef: Record<string, unknown> = {
    ...(el.props || {}),
    ref: elementRef,
  }
  return React.cloneElement(el, propsWithRef)
}

export default MutateObserver
