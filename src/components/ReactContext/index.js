import React from 'react'

const ReactContext = React.createContext({
  showMenu: false,
  onClickMenu: () => {},
  onAddItem: () => {},
  onIncreaseQuantity: () => {},
  onDecreaseQuantity: () => {},
  cartListItems: [],
  onDeleteItem: () => {},
})
export default ReactContext
