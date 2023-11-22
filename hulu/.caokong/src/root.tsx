import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot, RecoilEnv } from 'recoil';
import RecoilNexus from 'recoil-nexus';  


    import { vconsole, reportWebVitals } from '~ck'
    /**
     * 安装Redux DevTool调试Recoil
     * https://github.com/theohagos/recoil-observer
     * https://github.com/reduxjs/redux-devtools
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
     */ 
    import { RecoilObserver } from '@theohagos/recoil-observer';


RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
    root.render(
        <StrictMode>
            <RecoilRoot>
                
                    {/* 安装Redux DevTool调试Recoil */}
                    {/* bug: 会预执行recoil state */}
                    {/*  <RecoilObserver env="development" /> */}
                
                <RecoilNexus />
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </RecoilRoot>
        </StrictMode>,
    );

    
        vconsole();
        reportWebVitals();
    
}

export { render };
