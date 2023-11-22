import { isNil, rid, run } from '@hulu/mu';
import { camelCase, kebabCase } from 'lodash-es';

/**
 * 清除数据集
 * @param key - 数据集键名
 */
export const clearDataset = (key: string) => {
    const datasetKey = camelCase(key);
    const selector = `[data-${kebabCase(key)}]`;

    const previews = document.querySelectorAll(selector);
    for (const target of Array.from(previews)) {
        if (target instanceof HTMLElement) {
            delete target.dataset[datasetKey];
        }
    }
};

/**
 * 获取离指定元素最近的具有指定选择器的元素
 * @param element 指定元素
 * @param selector 指定选择器
 * @returns 符合选择器的最近元素或undefined
 */
export const getClosestElement = (element: Element, selector: string): Element | void => {
    if (!element) {
        return void 0;
    }

    if (!(element instanceof HTMLElement)) {
        return void 0;
    }

    if (element.classList.contains(selector)) {
        return element;
    }
    return getClosestElement(element.parentElement!, selector);
};

/**
 * 为指定的元素节点解决fixed zIndex 失效的问题
 * @param element - 要触发事件的元素节点
 * @returns 如果element为null或非HTMLElement类型，返回undefined；否则，返回void 0
 */
export const emitZIndexFixed = (element: HTMLElement): void => {
    if (!element) {
        return void 0;
    }

    if (!(element instanceof HTMLElement)) {
        return void 0;
    }

    const styles = window.getComputedStyle(element);

    // 如果元素的zIndex属性不是'auto', 'unset', 'inherit', 'initial', 'revert'之一
    if (!['auto', 'unset', 'inherit', 'initial', 'revert'].includes(styles.zIndex)) {
        element.dataset.metMontagePreviewFixed = 'auto';
    }

    return emitZIndexFixed(element.parentElement!);
};

/**
 * 清理montage标记
 */
export const destoryMontage = () => {
    const body = window.document.body;
    run(body.dataset.metMontage, () => {
        delete body.dataset.metMontage;
    });
};

/**
 * 判断元素是否需要被忽略处理
 *
 * @param element 要判断的元素
 * @returns 如果元素需要被忽略处理则返回true，否则返回false
 */
export function isIgnoreMontage(element: HTMLElement) {
    if (!element) {
        return false;
    }

    if (!(element instanceof HTMLElement)) {
        return false;
    }

    if (element?.dataset?.metMontageIgnore) {
        return true;
    }

    if (element.classList.contains('met-montage-ignore')) {
        return true;
    }

    return isIgnoreMontage(element?.parentElement!);
}

// export const mouseMove = function (x: number, y: number) {
//     const event = new MouseEvent('mouseover');
//     document.dispatchEvent(event);
// };

/**
 * 给当前页面写入
 */
// export const setMetId = (element: HTMLElement) => {
//     if (!element || !(element instanceof HTMLElement)) return void 0;
//     if (!element.dataset.metId) {
//         element.dataset.metId = rid();
//     }
//     if (element.children) {
//         for (const child of element.children) {
//             setMetId(child as HTMLElement);
//         }
//     }
// };
