// Icon Imports
import {
    MdBarChart,
    MdBlock,
    MdHome,
    MdOutlineShoppingCart,
} from 'react-icons/md';

import {
    ADMIN_COLLECTION,
    ADMIN_LAUNCHPAD,
    ADMIN_MARKETPLACE,
    ADMIN_NFT,
    ADMIN_USER,
    ADMINISTRATOR,
    VIEWER,
} from './config/contanst';
import AccountDetail from './views/admin/account/accountDetail';
import Accounts from './views/admin/account/accounts';
import CreateBlog from './views/admin/account/blog';
import CreateAccount from './views/admin/account/create';
import MainDashboard from './views/admin/AdminDashboard';
import CreateProject from './views/admin/launchpad/projects/CreateProject';
import Project from './views/admin/launchpad/projects/Project';
import Collection from "./views/admin/marketplace/collection/Collection";
import NFT from "./views/admin/marketplace/nft/NFT";
import User from "./views/admin/marketplace/user/User";
import Profile from './views/admin/profile';

const routes: RoutesType[] = [
    {
        name: 'Main Dashboard',
        layout: '/admin',
        path: 'default',
        icon: <MdHome className="h-6 w-6" />,
        roles: [VIEWER],
        component: <MainDashboard />,
    },
    {
        name: 'NFT Marketplace',
        path: 'marketplace',
        icon: <MdOutlineShoppingCart className="h-6 w-6" />,
        roles: [
            ADMIN_MARKETPLACE,
            ADMIN_USER,
            ADMIN_NFT,
            ADMIN_COLLECTION,
            ADMINISTRATOR,
        ],
        links: [
            {
              name: "NFT",
              path: "nft",
              component: <NFT />,
            },
            {
              name: "Collection",
              path: "collection",
              component: <Collection />,
            },
            {
              name: "User",
              path: "user",
              component: <User />,
            },
          ],
    },
    {
        name: 'Launchpad',
        icon: <MdBarChart className="h-6 w-6" />,
        path: '',
        roles: [ADMIN_LAUNCHPAD, ADMINISTRATOR],
        links: [
            {
                name: 'Create Project',
                path: 'create-project',
                component: <CreateProject />,
            },
            {
                name: 'Projects',
                path: 'projects',
                component: <Project />,
            },
        ],
    },
    {
        name: 'Profile',
        layout: '/admin',
        icon: <MdBarChart className="h-6 w-6" />,
        path: 'profile',
        roles: [VIEWER],
        component: <Profile />,
    },
    {
        name: 'Account',
        icon: <MdBarChart className="h-6 w-6" />,
        path: 'account',
        roles: [VIEWER],
        links: [
            {
                name: 'Create Account',
                path: 'create-account',
                roles: [ADMINISTRATOR],
                component: <CreateAccount />,
            },
            {
                name: 'Accounts',
                path: 'accounts',
                roles: [VIEWER],
                component: <Accounts />,
            },
            {
                name: 'Account Detail',
                path: 'account-overview',
                component: <AccountDetail />,
            },
        ],
    },
    {
        name: 'Blog',
        icon: <MdBlock className="h-6 w-6" />,
        path: 'blog',
        roles: [VIEWER],
        links: [
            {
                name: 'Create Blog',
                path: 'create-blog',
                component: <CreateBlog />,
            },
            { name: 'Blogs', path: 'blogs', component: <>AAAAA</> },
        ],
    },
];
export default routes;
