import { useEffect } from 'react'

// 默认的观察选项（子节点变化 + 子树 + 仅监控 class/style 属性）
const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
}

// 支持传入空值以便调用方可以在 hook 外部延迟解析目标
export default function useMutateObserver(
  nodeOrList: HTMLElement | HTMLElement[] | null | undefined,
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  useEffect(() => {
    console.log('useMutateObserver called')
    if (!nodeOrList) {
      return
    }

    let instance: MutationObserver | undefined

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList]

    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback)

      nodeList.forEach((element) => {
        if (element) {
          instance!.observe(element, options)
        }
      })
    }

    return () => {
      instance?.takeRecords()
      instance?.disconnect()
    }
    // 注意：nodeOrList 可能是数组（引用不稳定），但我们希望在目标变化时重新建立监听。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, nodeOrList])
}
