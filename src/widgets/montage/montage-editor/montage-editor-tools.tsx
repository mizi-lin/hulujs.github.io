import { Met, MetFlex, MetFlexProps } from '@hulu/met';
import { openMEState, themeMEState } from './montage-editor.store';
import { clearDataset } from '../utils';
import { MontageState, montageState } from '../montage.store';

interface MonacoEditorToolsProps {}

export const MontageEditorTools: FC<MonacoEditorToolsProps> = (props) => {
    const [theme, setTheme] = useRecoilState(themeMEState);
    const setOpen = useSetRecoilState(openMEState);
    const setMontage = useSetRecoilState(montageState);

    const attr: Partial<MetFlexProps>[] = [
        { pt: 13, h: 'auto', w: '100%', inline: true, flexWrap: 'wrap', placement: 'top' },
        { h: 46, w: '100%', inline: false, flexWrap: 'nowrap', placement: 'left' }
    ];

    const onClose = () => {
        clearDataset('met-montage-preview');
        clearDataset('met-montage-preview-fixed');
        setMontage(MontageState.IDLE);
        setOpen(false);
    };

    return (
        <MetFlex gap={8} {...attr[+theme.openAside]}>
            <Met tag={Fragment} color="rgb(171, 171, 171)" fs={20} cursor="pointer">
                <CloseOutlined onClick={onClose} />
                {!theme.openAside && <MenuFoldOutlined onClick={() => setTheme({ openAside: true })} />}
                {theme.openAside && <MenuUnfoldOutlined onClick={() => setTheme({ openAside: false })} />}
                {/* {!theme.full && <ExpandOutlined onClick={() => setTheme({ full: true })} />}
                {theme.full && <CompressOutlined onClick={() => setTheme({ full: false })} />} */}
            </Met>
        </MetFlex>
    );
};
