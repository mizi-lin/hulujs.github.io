import { getReactInstanceForElement } from './get-react-instance-for-element';

export function getReactInstancesForElement(element: HTMLElement) {
    /** @type {Set<Fiber>} */
    const instances = new Set();
    let instance = getReactInstanceForElement(element);

    while (instance) {
        instances.add(instance);

        instance = instance._debugOwner;
    }

    return Array.from(instances);
}
