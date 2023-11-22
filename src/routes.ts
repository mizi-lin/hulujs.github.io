/**
 * 路由配置
 */
const routes = [
    {
        path: '/',
        view: 'home',
        meta: {
            count: 1,
            back: () => {
                console.log('111111');
            }
        }
    },
    {
        path: '/demo',
        view: 'demo',
        children: [
            { path: '/demo/eee/:id', view: 'home' },
            { path: '/demo/ddd/:id?', view: 'home' },
            { path: '/demo/fff/*', view: 'home' }
        ]
    },

    { path: '/todos/:status?', view: 'todos' },
    { path: '/ui-layout', view: 'ui-layout' },
    { path: '/editor', view: 'editor' }
];

export default routes;
