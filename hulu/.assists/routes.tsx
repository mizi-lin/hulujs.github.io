/**
 * 路由配置
 */
const routes = [
  {
    "path": "/",
    "view": "/Users/Mizi/works/hulu/demo28/hulu/.assists/layout.tsx",
    "children": [
      {
        "path": "*",
        "view": "/Users/Mizi/works/hulu/demo28/src/views/no-match/index.ts",
        "lazy": () => import('/Users/Mizi/works/hulu/demo28/src/views/no-match/index.ts')
      },
      {
        "path": "no-permission",
        "view": "/Users/Mizi/works/hulu/demo28/hulu/.caokong/src/views/no-permission/index.ts",
        "lazy": () => import('/Users/Mizi/works/hulu/demo28/hulu/.caokong/src/views/no-permission/index.ts')
      },
      {
        "path": "no-match",
        "view": "/Users/Mizi/works/hulu/demo28/src/views/no-match/index.ts",
        "lazy": () => import('/Users/Mizi/works/hulu/demo28/src/views/no-match/index.ts')
      },
      {
        "path": "/",
        "view": "home",
        "meta": {
          "count": 1
        },
        "lazy": () => import('@/views/home')
      },
      {
        "path": "/demo",
        "view": "demo",
        "children": [
          {
            "path": "/demo/eee/:id",
            "view": "home",
            "lazy": () => import('@/views/home')
          },
          {
            "path": "/demo/ddd/:id?",
            "view": "home",
            "lazy": () => import('@/views/home')
          },
          {
            "path": "/demo/fff/*",
            "view": "home",
            "lazy": () => import('@/views/home')
          }
        ],
        "lazy": () => import('@/views/demo')
      },
      {
        "path": "/todos/:status?",
        "view": "todos",
        "lazy": () => import('@/views/todos')
      },
      {
        "path": "/ui-layout",
        "view": "ui-layout",
        "lazy": () => import('@/views/ui-layout')
      },
      {
        "path": "/editor",
        "view": "editor",
        "lazy": () => import('@/views/editor')
      }
    ],
    "lazy": () => import('/Users/Mizi/works/hulu/demo28/hulu/.assists/layout.tsx')
  }
];

export default routes;