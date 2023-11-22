import MonacoEditor from '@/widgets/monaco-editor';
import { codeMEStore } from '@/widgets/montage/montage-editor/montage-editor.store';
import { sleep } from '@hulu/mu';
import React from 'react';

const demoState = selector({
    key: 'demoState',
    get: async () => {
        await sleep(1000);
        return { data: { a: 1, b: { aa: 'aaa' }, c: 3 } };
        // return { data: [] };
    }
});

const Demo = (props) => {
    console.log('oooOooo', JSON.stringify(props.data));
    return <>{JSON.stringify(props.data, null, 2)}</>;
};

const Editor = () => {
    const [open, setOpen] = useState(false);

    return (
        <Suspense fallback={<></>}>
            {/* <MetBox h={600} bg={'lightcyan'}>
                <MetRuyi selector={demoState}>
                    <Demo />
                </MetRuyi>
            </MetBox> */}

            {/* {open && (
                <MetRuyi selector={materialListState}>
                    <MaterialList />
                </MetRuyi>
            )} */}

            <MonacoEditor selector={codeMEStore} save={() => void 0} />

            {/* <MetGrid
                gap={'16px 8px'}
                bg={'lightcyan'}
                h={300}
                cols={['200px', '1fr', '2fr']}
                rows={'120px'}
                overflowY="auto"
                p={16}
            >
                <Met tag={Fragment} br={16} border={'1px solid #dedede'} p={16}>
                    <Met bg={'lightblue'}>1</Met>
                    <Met bg={'lightcoral'}>2</Met>
                    <Met bg={'lightgoldenrodyellow'}>3</Met>
                    <Met bg={'lightgray'}>4</Met>
                    <Met bg={'lightgreen'}>5</Met>
                    <Met bg={'lightpink'}>6</Met>
                    <Met bg={'lightsalmon'}>7</Met>
                    <Met bg={'lime'}>8</Met>
                </Met>
            </MetGrid> */}
        </Suspense>
    );
};
export default Editor;
