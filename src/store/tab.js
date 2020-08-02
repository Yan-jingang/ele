import Cookie from 'js-cookie'
export default {
    state: {
        menu: [],
        currentMenu: {},
        isCollapse: false,
        tags: [
            {
                path: '/',
                name: '首页',
                icon: 'home'
            }
        ]
    },
    mutations: {
        // 定义方法
        selectMenu(state, value) {
            if (value.path == '/') {
                state.currentMenu = null;
            } else {
                state.currentMenu = value;
                state.tags.push(value);
                state.tags = [...new Set(state.tags)]
            }
        },
        // tag方法
        closetag(state, val) {
            let result = state.tags.findIndex(item => item.name === val.name)
            state.tags.splice(result, 1)
        },
        changescoll(state) {
            state.isCollapse = !state.isCollapse
        },
        // 动态路由设置
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        // 清除cookid
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 添加
        addMenu(state, router) {
            // 查看是否
            if (!Cookie.get('menu')) {
                return
            }
            let menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            let currentMenu = [
                {
                    path: '/',
                    component: () => import(`@/views/Main`),
                    children: []
                }
            ]
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentMenu[0].children.push(item)
                }
            })
            router.addRoutes(currentMenu)
        },
    },
    actions: {},
}