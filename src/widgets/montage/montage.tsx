import { html } from 'htm/react';
import { ifrun } from '@hulu/mu';
import { ContextMenu } from './context-menu';
import { isIgnoreMontage, clearDataset } from './utils';
import { MotageEditor, previewStyleState } from './montage-editor';
import { MontageState, montageState } from './montage.store';
import { getSelectors } from '../monaco-editor/get-selectors';

const listener = new Map();
const Montage: FC<{ editor: 'vscode' }> = (props) => {
    const { editor } = props;
    const [target, setTarget] = useState<HTMLElement>();
    const [inset, setInset] = useState<Record<string, any>>({});
    const [montage, setMontage] = useRecoilState(montageState);
    const previewStyle = useRecoilValue(previewStyleState);
    const body = window.document.body;
    // const [position, setPosition] = useState({ visibility: 'hidden', left: -9999 });

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const { altKey } = event;

            // window alt | mac options
            if (altKey && body.dataset.metMontage !== MontageState.MONTAGE_EDITOR) {
                const state = montage === MontageState.SELECT ? MontageState.IDLE : MontageState.SELECT;
                setMontage(state);
            }
        },
        [montage]
    );

    // 捕获当前鼠标指向的element
    const onMouseMove = useCallback(
        (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof HTMLElement && montage === MontageState.SELECT && !isIgnoreMontage(target)) {
                setTarget(target);
            }
        },
        [montage]
    );

    const onContextMenu = useCallback(
        (event: MouseEvent) => {
            const { target, pageX, pageY, clientY } = event;

            // const selector = getSelectors(target as HTMLElement);
            // console.log('::::--->', selector);
            // console.log(document.querySelector(selector));

            // console.log('onContextMenu::->->', event, montage, target, target instanceof HTMLElement);
            if (body.dataset.metMontage === MontageState.SELECT && target instanceof HTMLElement) {
                event.preventDefault();
                if (body.dataset.metMontage === MontageState.SELECT) {
                    setMontage(MontageState.CONTEXT_MENU);
                    setInset({ left: pageX, top: clientY - 30 });
                    setTarget(target);
                }
            }
        },
        [montage]
    );

    useEffect(() => {
        // 每次只允许一个元素被圈选
        clearDataset('met-montage-target');

        if (MontageState.IDLE === montage) {
            delete body.dataset.metMontage;
            return void 0;
        }

        body.dataset.metMontage = montage;

        if (MontageState.MONTAGE_EDITOR === montage) return void 0;

        if (target instanceof HTMLElement) {
            target.dataset.metMontageTarget = montage;
        }
    }, [montage, target]);

    const onOpenChange = (open: boolean) => {
        setMontage(MontageState.SELECT);
    };

    const removeEventListenersFromWindow = () => {
        clearDataset('met-montage-preview');

        ifrun(listener.get('keydown'), (onKeyDown: any) => {
            window.removeEventListener('keydown', onKeyDown, { capture: true });
        });

        ifrun(listener.get('mousemove'), (onMouseMove: any) => {
            window.removeEventListener('mousemove', onMouseMove);
        });

        ifrun(listener.get('click'), (onClick: any) => {
            window.removeEventListener('click', onClick, { capture: true });
        });

        ifrun(listener.get('contextmenu'), (onContextmenu: any) => {
            window.removeEventListener('contextmenu', onContextmenu, { capture: true });
        });

        ifrun(listener.get('keyup'), (onKeyup: any) => {
            window.removeEventListener('keyup', onKeyup);
        });
    };

    useEffect(
        function addEventListenersToWindow() {
            // window.addEventListener('click', onClick, { capture: true });
            // window.addEventListener('keyup', onKeyUp);
            window.addEventListener('contextmenu', onContextMenu, { capture: true });
            window.addEventListener('keydown', onKeyDown, { capture: true });
            window.addEventListener('mousemove', onMouseMove);
            listener.set('keydown', onKeyDown);
            listener.set('mousemove', onMouseMove);
            listener.set('contextmenu', onContextMenu);
            return removeEventListenersFromWindow;
        },
        // [onClick, onContextMenu, onKeyDown, onKeyUp, onMouseMove]
        [onKeyDown, onMouseMove, onContextMenu]
    );

    return html`
        <style key="click-to-component-style">
            [data-met-montage] {
                cursor: var(--click-to-component-cursor, context-menu) !important;

                * {
                    pointer-events: auto !important;
                }
            }

            [data-met-montage] [data-met-montage-target] {
                outline: 3px solid red;
                outline-offset: -4px;
                outline-style: dotted;
                transition: all 0.2s ease-in-out;
            }

            [data-met-montage-preview] {
                position: fixed !important;
                outline: 3px solid #1677ff;
                outline-offset: -4px;
                outline-style: dotted;
                transition: all 0.2s ease-in-out;
                background: #fff;
                z-index: 9000;
            }

            [data-met-montage-preview] {
                ${previewStyle}
            }

            [data-met-montage-preview-fixed] {
                z-index: auto !important;
            }
        </style>

        <!-- Montage 右键菜单 -->
        <${ContextMenu}
            key="context-menu"
            open=${montage === MontageState.CONTEXT_MENU}
            inset=${inset}
            target=${target}
            editor=${editor}
            onOpenChange=${onOpenChange}
        />

        <!-- Montage 编辑器 -->
        <${MotageEditor} key="montage-editor" />
    `;
};

export default Montage;
