import { MouseEvent } from 'react';
import { Fiber } from 'react-reconciler';
import { getDisplayNameForInstance } from './get-display-name-for-instance';
import { FiberSource, getPathToSource } from './get-path-to-source';
import { getPropsForInstance } from './get-props-for-instance';
import { getReactInstancesForElement } from './get-react-instances-for-element';
import { getSourceForInstance } from './get-source-for-instance';
import { Met, MetBox, MetCenter, MetFlex } from '@hulu/met';
import { html } from 'htm/react';
import { getClosestElementForIntsance } from './get-closest-element-for-instance';
import { isFalsy, run } from '@hulu/mu';
import { MontageState, currentFiberSourceState, fiberInstancesState, montageState } from './montage.store';
import { currentFilePathMEState, instanceState, openMEState } from './montage-editor';
import vscodeIcon from './assets/vscode.svg';
import { getSelectors } from '../monaco-editor/get-selectors';

interface InstanceListProps {
    target: HTMLElement;
    editor: string;
}

/** fiber 实例属性 */
const PropKeys: FC<{ propKeys: string[]; props: Record<string, any> }> = ({ propKeys = [], props = {} }) => {
    return (
        <>
            {propKeys.map((key) => {
                return (
                    <Met tag={'var'} key={key} bg={'rgba(0 0 0 / 5%)'} p={'0 4px'} br={4}>
                        <Tooltip title={props[key]}>{key}</Tooltip>
                    </Met>
                );
            })}
        </>
    );
};

const getIntances = (target: HTMLElement, pathname: string) => {
    return getReactInstancesForElement(target)
        .filter((instance) => getSourceForInstance(instance as Fiber))
        .map((instance, i) => {
            const instance$ = instance as Fiber;
            const name = getDisplayNameForInstance(instance$);
            const source = getSourceForInstance(instance$)!;
            const path = getPathToSource(source);
            const props = getPropsForInstance(instance$);
            const propKeys = Object.keys(props);
            const closestElement = getClosestElementForIntsance(instance$) ?? target;
            const closestElementSelector = getSelectors(closestElement);
            // const relative = path.split(/\//).at(-1);
            const relative = path.replace(/.*src(.*)$/, '@$1');
            return {
                key: path,
                relative,
                name,
                source,
                path,
                props,
                propKeys,
                closestElement,
                pathname,
                closestElementSelector
            };
        });
};

/** 实例列表 */
export const InstanceList: FC<InstanceListProps> = (props) => {
    const { target, editor } = props;
    const { pathname } = useLocation();
    const setMontage = useSetRecoilState(montageState);
    const setBaseSource = useSetRecoilState(currentFiberSourceState);
    const setMontageEditorOpen = useSetRecoilState(openMEState);
    const setMECurrentFilePath = useSetRecoilState(currentFilePathMEState);
    const setFiberInstances = useSetRecoilState(fiberInstancesState);
    const setInstance = useSetRecoilState(instanceState);
    const instances = getIntances(target, pathname);

    const openEditor = (path: string) => {
        const url = `${editor}://file${path}`;
        window.open(url);
    };

    // 设置hover后可以打开实例列表属性信息
    const hoverInstance = (target: HTMLElement, event: MouseEvent) => {
        const elements = document.querySelectorAll('[data-met-montage-target]');
        for (const target of Array.from(elements)) {
            if (target instanceof HTMLElement) {
                delete target.dataset.metMontageTarget;
            }
        }

        // 在相应的element上标识可右键信息标签
        if (target instanceof HTMLElement) {
            target.dataset.metMontageTarget = MontageState.CONTEXT_MENU;
        }

        // 去除 hover 样式
        const element = event.target as HTMLElement;
        run(element.parentElement!.querySelector('.hover'), (element) => {
            element.classList.remove('hover');
        });
    };

    // 设置当前实例信息
    const handleBaseFiberSource = (instance: Record<string, any>) => {
        setMontage(MontageState.MONTAGE_EDITOR);
        setTimeout(() => {
            setMontageEditorOpen(true);
            setFiberInstances(instances);
            setInstance(instance);
            setMECurrentFilePath(instance?.source.fileName);
        }, 10);
    };

    // 没有实例显示空
    if (isFalsy(instances)) {
        return (
            <MetCenter w={300}>
                <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </MetCenter>
        );
    }

    return (
        <MetBox br={8} gap={4} p={4} data-montage-instance-list>
            {html`
                <style key="montage-instance-list">
                    [data-montage-instance-list] > section.hover,
                    [data-montage-instance-list] > section:hover {
                        background: royalblue;
                        border-radius: 8px;
                        cursor: pointer;
                    }

                    [data-montage-instance-list] > section.hover code,
                    [data-montage-instance-list] > section:hover code {
                        color: #fff !important;
                    }

                    [data-montage-instance-list] > section.hover [data-montage-path],
                    [data-montage-instance-list] > section:hover [data-montage-path] {
                        color: rgba(255, 255, 255, 0.6) !important;
                    }

                    [data-montage-instance-list] code {
                        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
                            'Courier New', monospace;
                    }

                    [data-montage-instance-list] code var {
                        background: rgba(0 0 0 / 5%);
                        cursor: help;
                        border-radius: 3px;
                        padding: 3px 6px;
                        font-style: normal;
                        font-weight: normal;
                        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                            'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
                            'Segoe UI Symbol', 'Noto Color Emoji';
                    }
                </style>
            `}
            {/* closestElement 为 source closestElement */}
            {instances.map((instance, inx) => {
                const { name, source, path, props, propKeys, closestElement } = instance;
                return (
                    <MetFlex
                        key={path}
                        gap={16}
                        padding={'8px 12px'}
                        className={inx ? '' : 'hover'}
                        onMouseOver={(e) => {
                            hoverInstance(closestElement, e);
                        }}
                    >
                        <MetCenter gap={8}>
                            <Met tag={Fragment} fs={22} color="#cecece">
                                <Met tag={ChromeOutlined} onClick={() => handleBaseFiberSource(instance)} />
                                <Met tag={CodeOutlined} onClick={() => openEditor(path)} />
                            </Met>
                        </MetCenter>
                        <MetBox gap={2} flex={1}>
                            <MetFlex tag={'code'} gap={8} color="royalblue" placement={'left'}>
                                <Met fontWeight={500}>&lt;{name}</Met>
                                <PropKeys propKeys={propKeys} props={props} />
                                <Met>/&gt;</Met>
                            </MetFlex>
                            <MetFlex placement={'betweenMiddle'} gap={16} color={'#aaa'}>
                                <Met>{source.fileName.replace(/.*(src|pages)/, '$1')}</Met>
                                <Met fs={'small'}>
                                    {source.lineNumber}:{source.columnNumber}
                                </Met>
                            </MetFlex>
                        </MetBox>
                    </MetFlex>
                );
            })}
        </MetBox>
    );
};
