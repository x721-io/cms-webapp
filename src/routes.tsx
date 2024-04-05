// Icon Imports
import {
  MdBarChart,
  MdBlock,
  MdHome,
  MdOutlineShoppingCart,
} from "react-icons/md";

import MainDashboard from "./views/admin/AdminDashboard";
import Profile from "./views/admin/profile";
import CreateAccount from "./views/admin/account/create";
import Marketplace from "./views/admin/marketplace/Marketplace";
import LaunchpadPage from "./views/admin/launchpad/LaunchpadPage";
import AccountDetail from "./views/admin/account/accountDetail";
import Accounts from "./views/admin/account/accounts";
import {
  ADMIN_COLLECTION,
  ADMIN_LAUNCHPAD,
  ADMIN_MARKETPLACE,
  ADMIN_NFT,
  ADMIN_USER,
  ADMINISTRATOR,
  VIEWER,
} from "./config/contanst";
import CreateBlog from "./views/admin/account/blog";

const routes: RoutesType[] = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    roles: [VIEWER],
    component: <MainDashboard />,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    roles: [
      ADMIN_MARKETPLACE,
      ADMIN_USER,
      ADMIN_NFT,
      ADMIN_COLLECTION,
      ADMINISTRATOR,
    ],
    component: <Marketplace />,
  },
  {
    name: "Launchpad",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "launchpad",
    roles: [ADMIN_LAUNCHPAD, ADMINISTRATOR],
    component: <LaunchpadPage />,
  },
  {
    name: "Profile",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "profile",
    roles: [VIEWER],
    component: <Profile />,
  },
  {
    name: "Account",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "account",
    roles: [VIEWER],
    links: [
      {
        name: "Create Account",
        path: "create-account",
        roles: [ADMINISTRATOR],
        component: <CreateAccount />,
      },
      {
        name: "Accounts",
        path: "accounts",
        roles: [VIEWER],
        component: <Accounts />,
      },
      {
        name: "Account Detail",
        path: "account-overview",
        component: <AccountDetail />,
      },
    ],
  },
  {
    name: "Blog",
    icon: <MdBlock className="h-6 w-6" />,
    path: "blog",
    roles: [VIEWER],
    links: [
      {
        name: "Create Blog",
        path: "create-blog",
        component: <CreateBlog />,
      },
      { name: "Blogs", path: "blogs", component: <>AAAAA</> },
    ],
  },
];
export default routes;
