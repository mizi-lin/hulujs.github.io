import { CollapseProps } from 'antd';
import { currentFiberSourceState, fiberInstancesState } from '../montage.store';
import { camelCase, groupBy } from 'lodash-es';
import { isFalsy, map } from '@hulu/mu';
import { DataNode } from 'antd/es/tree';
import { Met, MetBox } from '@hulu/met';
import { Key } from 'react';
import { currentFilePathMEState, instanceState, previewStyleState, previewTokenState } from './montage-editor.store';
import { clearDataset, emitZIndexFixed, getClosestElement } from '../utils';
import sty from './montage-editor.module.less';

const { DirectoryTree } = Tree;

interface MontageEditorInstancesProps extends Omit<CollapseProps, 'items'> {
    aaa: HTMLElement;
}

export const MontageEditorInstances: FC<MontageEditorInstancesProps> = (props: MontageEditorInstancesProps) => {
    const instances = useRecoilValue(fiberInstancesState);
    const [instance, setInstance] = useRecoilState(instanceState);
    const { source } = instance;
    const setMECurrentFilePath = useSetRecoilState(currentFilePathMEState);
    const setPreview = useSetRecoilState(previewStyleState);
    const token = useRecoilValue(previewTokenState);
    const items: DataNode[] = map(
        groupBy(instances, 'pathname'),
        (value, key) => {
            const children = map(value, (item) => {
                const title = (
                    <MetBox inline>
                        <Met fs={15}>{item.name}</Met>
                        <Met fw={200}>{item.relative}</Met>
                    </MetBox>
                );
                return { key: item.key, title, isLeaf: true, item };
            });

            return {
                key,
                title: (
                    <Met fs={15} inline>
                        {key}
                    </Met>
                ),
                children
            };
        },
        []
    );

    const showPreview = (item: Record<string, any>) => {
        const { closestElement: viewElement, source, closestElementSelector } = item;
        const target = document.querySelector(`.${sty['montage-editor-intances-tree']}`) as HTMLElement;
        // 清除上次操作信息
        const datasetKey = 'met-montage-preview';
        clearDataset(datasetKey);
        clearDataset('met-montage-preview-fixed');

        // 写入preview信息
        if (!viewElement) return void 0;

        viewElement.dataset[camelCase(datasetKey)] = source.fileName;

        /**
         * 代码修改时，触发Fast Refresh 刷新页面, Store中存储的DOM与document失去关联
         */
        let viewElement$ = viewElement;
        if (!document.querySelector(`[data-${datasetKey}]`)) {
            viewElement$ = document.querySelector(closestElementSelector)!;
            viewElement$.dataset[camelCase(datasetKey)] = source.fileName;
        }

        const target$ = getClosestElement(target, 'ant-tree-treenode') ?? target;

        // 计算preview位置信息
        const rect = target$!.getBoundingClientRect();
        const { width, height } = viewElement$!.getBoundingClientRect();
        setPreview(`
            left: calc((${rect.left}px - ${width}px) / 2);
            top: calc((100% - ${height}px) / 2);
        `);
        // 修正fixed下zIndex失效的问题
        emitZIndexFixed(viewElement$?.parentElement!);
    };

    const onSelect = (keys: Key[], e: any) => {
        const { item } = e.node;
        if (isFalsy(item)) return void 0;
        setInstance(item);
        // 编辑器打开文件
        const { source } = item;
        setMECurrentFilePath(source.fileName);
    };

    useEffect(() => {
        // Fast Refresh 时，会有一个的缓冲时间
        setTimeout(() => {
            showPreview(instance);
        }, 200);
    }, [instance.closestElementSelector, token]);

    return (
        <DirectoryTree
            treeData={items}
            showLine={true}
            selectedKeys={[`${source.fileName}:${source.lineNumber}:${source.columnNumber}`]}
            className={sty['montage-editor-intances-tree']}
            onSelect={onSelect}
            defaultExpandAll
            blockNode
        />
    );
};
