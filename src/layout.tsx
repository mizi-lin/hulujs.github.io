import Montage from './widgets/montage';

if (import.meta.hot) {
    // HMR 代码
    import.meta.hot.on('vite:beforeUpdate', (...args) => {
        console.log('vite:beforeUpdate', ...args);
    });
}

const Layout: FC<PropsWithChildren> = (props) => {
    return (
        <>
            <Montage editor="vscode" />
            <Outlet />
        </>
    );
};

export default Layout;
