/**
 * 由 fiber instance 获取最近关联的 element
 */
export function getClosestElementForIntsance(instance: any) {
    if (!instance) {
        return void 0;
    }

    const { stateNode } = instance;

    if (stateNode instanceof HTMLElement) {
        return stateNode;
    }

    return getClosestElementForIntsance(instance?.child);
}
