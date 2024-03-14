import { get } from 'svelte/store'
import { createSessionStorageStore } from "@budibase/frontend-core"

const baseStore = createSessionStorageStore("openNodes", {})

const toggleNode = componentId => {
  baseStore.update(openNodes => {
    openNodes[`nodeOpen-${componentId}`] = !openNodes[`nodeOpen-${componentId}`]

    return openNodes
  })
}

const expandNode = componentId => {
  baseStore.update(openNodes => {
    openNodes[`nodeOpen-${componentId}`] = true

    return openNodes
  })
}

const expandNodes = componentIds => {
  baseStore.update(openNodes => {
    const newNodes = Object.fromEntries(
      componentIds.map(id => [`nodeOpen-${id}`, true])
    )

    return { ...openNodes, ...newNodes }
  })
}

const collapseNode = componentId => {
  baseStore.update(openNodes => {
    openNodes[`nodeOpen-${componentId}`] = false

    return openNodes
  })
}

const isNodeExpanded = componentId => {
  const openNodes = get(baseStore);
  return !!openNodes[`nodeOpen-${componentId}`]
}

const store = {
  subscribe: baseStore.subscribe,
  toggleNode,
  expandNode,
  expandNodes,
  collapseNode,
  isNodeExpanded
}

export default store
