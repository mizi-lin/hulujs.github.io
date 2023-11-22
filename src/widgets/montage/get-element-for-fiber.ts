/**
 * 保存代码， react fresh 工作后，
 * temp 中的 element 与 当前页面DOM Tree 失去关联
 * 且 暂存在 element 上的 data-* 信息也丢失
 * 该方法该通过__reactFiber$ 查找DOM
 */
let temp: Element;

const findElement = (dom: HTMLElement, fiberKey: string): Element | void => {
    if (temp) return temp;
    // @ts-ignore
    if (dom[fiberKey]) {
        temp = dom;
        return temp;
    }
    if (dom.children.length) {
        for (const child of dom.children) {
            // @ts-ignore
            const element = findElement(child as Element, fiberKey);
            if (element) {
                return element;
            }
        }
    }
};

export function getElementForFiber(dom: HTMLElement) {
    const fiberKey = Object.keys(dom).find((key) => key.startsWith('__reactFiber$'));
    const element = findElement(document.querySelector('body') as HTMLElement, fiberKey!);
    return element;
}
