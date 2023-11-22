import { number } from '@recoiljs/refine';
import { useRecoilSnapshot, useRecoilStoreID } from 'recoil';
import { syncEffect } from 'recoil-sync';
// import { RecoilURLSync, RecoilURLSyncJSON, syncEffect } from 'recoil-sync';
import {
    urlSyncAtom,
    useQuery,
    useParams,
    useNavigate,
    queryURLSyncState,
    mixURLSyncState
} from '~ck';

// const currentUserState = atom<any>({
//     key: 'b',
//     default: {},
//     effects: [syncEffect({ refine: number() })]
// });

export const currentUserState = atom<number>({
    key: 't',
    default: 0,
    effects: [syncEffect({ refine: number() })]
});

const urlState = urlSyncAtom({
    type: 'query',
    key: 'urlSync/atom'
});

const urlaa = selector({
    key: 'urlaa/state',
    get: ({ get }) => {
        const query = get(urlState);
        console.log('------>', query);
    }
});

// const abc = atomUrlSync('a', 'number');

const Demo = () => {
    // const urlSync = useRecoilValue(urlSyncAtom);
    // const route = useRoute();
    const location = useLocation();
    const [{ id }, setParams] = useParams();
    const [query, setQuery] = useQuery(true);

    // const matcher = useMatch('/demo/eee/:id');
    // let [searchParams, setSearchParams] = useSearchParams();
    const [user, setUser] = useRecoilState(currentUserState);
    // console.log(':::user->', user);
    // console.log('route', route);
    // console.log('useSync', urlSync);
    // console.log('location', location);
    // console.log('params', params);

    const navigate = useNavigate();
    const URLSync = useRecoilValue(urlState);
    const queryURLSync = useRecoilValue(mixURLSyncState);

    console.log(':::---> URLSync', queryURLSync);
    // console.log(':::--->', { user, query: query.t });

    return (
        <>
            <div
                onClick={() => {
                    setQuery({ t: Math.random() }, ['a']);
                }}
            >
                Demo
            </div>
            <div></div>
            <div
                onClick={() => {
                    setUser(Math.random());
                }}
            >
                tttttttttttttttttttttttttt -- {user} {typeof user}
            </div>
            <div
                onClick={() => {
                    navigate('-', { params: { id: id + 1 } });
                }}
            >
                params: {id}
            </div>
            <div
                onClick={() => {
                    setParams({ id: id + 1 });
                    setUser(id + 1);
                }}
            >
                set params: {id}
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Demo;
