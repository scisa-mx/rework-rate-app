export type ItemNavbar = {
  name: string
  icon: string
  route: string
}

export type ToggleItemNavbar = {
  name: string
  icon: string
  links: ItemNavbar[]
}
