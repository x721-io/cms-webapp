// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <></>,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "default",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <></>,
    secondary: true,
  },
  {
    name: "Launchpad",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <></>,
  }
];
export default routes;
