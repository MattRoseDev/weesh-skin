import Home from './Home'
import About from './About'

const routes = [
    {
        key: 'home',
        exact: true,
        path: '/',
        component: Home,
    },
    {
        key: 'about',
        path: '/about',
        component: About,
    },
]

export default routes