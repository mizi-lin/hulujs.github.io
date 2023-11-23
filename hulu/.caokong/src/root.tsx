import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot, RecoilEnv } from 'recoil';
import RecoilNexus from 'recoil-nexus';  



RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;


function render(App: ComponentType) {
    const container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <RecoilRoot>
                
                <RecoilNexus />
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </RecoilRoot>
        </StrictMode>,
    );

    
}

export { render };
