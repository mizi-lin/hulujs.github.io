import { number } from '@recoiljs/refine';
import { syncEffect } from 'recoil-sync';
import { useRoute } from '~ck';
import { currentUserState } from '../demo/demo';

const Home = () => {
    // const value = useRecoilValue(currentUserState);
    return (
        <article>
            <header>Home</header>
            <main>
                <Outlet />
            </main>
        </article>
    );
};

export default Home;
