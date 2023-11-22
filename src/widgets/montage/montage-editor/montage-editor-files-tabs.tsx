import { TabsProps } from 'antd';
import { currentFilePathMEState, tabItemsMEStore } from './montage-editor.store';
import { map } from '@hulu/mu';
import { ModifyPoint } from './modify-point';
import sty from './montage-editor.module.less';

interface MontageEditorTabsProps extends TabsProps {}

export const MontageEditorTabs: FC<MontageEditorTabsProps> = memo((props: MontageEditorTabsProps) => {
    const tabItems = useRecoilValue(tabItemsMEStore);
    const [current, setMontageEditorCurrentFilePath] = useRecoilState(currentFilePathMEState);

    const tabItem$ = map(tabItems, (item) => {
        const { key } = item;
        const label = (
            <Tooltip
                title={key.replace(/.*(src|pages)/, '$1')}
                placement="bottomLeft"
                rootClassName="met-montage-igonre"
                data-met-montage-ignore
            >
                <span>{item.label}</span>
                <ModifyPoint filePath={key} />
            </Tooltip>
        );
        return { ...item, label };
    });

    const handleChange = (key: string) => {
        setMontageEditorCurrentFilePath(key);
    };

    return (
        <Tabs
            items={tabItem$}
            activeKey={current}
            className={sty['montage-editor-tab']}
            onChange={handleChange}
            {...props}
        />
    );
});
