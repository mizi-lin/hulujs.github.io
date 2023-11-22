import MonacoEditor from '@/widgets/monaco-editor';
import { codeMEStore, currentFilePathMEState, themeMEState, useSaveCode } from './montage-editor.store';
import { MetFlex, Met, MetBox, MetRuyi } from '@hulu/met';
import { openMEState } from './montage-editor.store';
import { DrawerProps } from 'antd';
import { MontageEditorTabs } from './montage-editor-files-tabs';
import { MontageEditorTools } from './montage-editor-tools';
import sty from './montage-editor.module.less';
import { MontageEditorInstances } from './montage-editor-instances';
import { clearDataset } from '../utils';
import { MontageState, montageState } from '../montage.store';

/**
 * Montage 定制编辑器
 */
export interface MontageEditorProps extends DrawerProps {}
export const MotageEditor: FC<MontageEditorProps> = (props) => {
    const [open, setOpen] = useRecoilState(openMEState);
    const theme = useRecoilValue(themeMEState);
    const filePath = useRecoilValue(currentFilePathMEState);
    const setMontage = useSetRecoilState(montageState);
    const saveCode = useSaveCode();
    const ref = useRef();
    const [aaa, setAaa] = useState();

    const onClose = () => {
        clearDataset('met-montage-preview');
        clearDataset('met-montage-preview-fixed');
        setOpen(false);
        setMontage(MontageState.IDLE);
    };

    return (
        <Drawer
            width={theme.width}
            open={open}
            closable={false}
            className={sty['montage-editor-drawer']}
            onClose={onClose}
            {...props}
            data-met-montage-ignore
        >
            <MetFlex bg={'#1e1e1e'} h={'100%'}>
                <Met
                    w={theme.openAside ? theme.asideWidth : 48}
                    bdr="rgb(71, 71, 71)"
                    pl={8}
                    pr={8}
                    gap={16}
                    transition={'all .3s'}
                    ref={ref}
                >
                    <MontageEditorTools />
                    {theme.openAside && <MontageEditorInstances aaa={aaa} />}
                </Met>
                <MetBox flex={1} pl={16} scroll={false}>
                    <Met h={46}>
                        <Suspense>
                            <MontageEditorTabs />
                        </Suspense>
                    </Met>
                    <Met flex={1}>
                        {/* <MetRuyi selector={codeMEStore(filePath)} transmit={{ data: 'content' }}> */}
                        <MonacoEditor save={saveCode} filePath={filePath} data-met-montage-ignore />
                        {/* </MetRuyi> */}
                    </Met>
                </MetBox>
            </MetFlex>
        </Drawer>
    );
};
