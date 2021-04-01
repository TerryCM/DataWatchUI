import Link from "next/link"
import { useRouter } from "next/router"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import { menuItems } from "../menuItems"

const NavButton = (props) => (
  <div>
    <Link href={props.path}>
      <ListItem button selected={props.selected}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItem>
    </Link>
  </div>
)

export default function SideBar(props) {
  const route = useRouter().route
  const navItems = menuItems.filter(
    (item) => !item.restricted || props.showStaff
  )

  return (
    <div>
      {navItems.map((item) => (
        <NavButton
          key={item.path}
          {...props}
          {...item}
          selected={route.startsWith(item.path)}
        />
      ))}
    </div>
  )
}
