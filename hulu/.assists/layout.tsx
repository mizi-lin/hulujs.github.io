import { RecoilURLSync } from '~ck';
import Layout from '/Users/Mizi/works/hulu/demo28/src/layout.tsx';

const Component = function WrapperLayout() {
    return (<RecoilURLSync>
        <Layout />
    </RecoilURLSync>)
}

export { Component };