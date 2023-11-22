const getClassSelector = (node: HTMLElement, document: Document) => {
    // 获得class的选择器名称
    return [...(node.classList ?? [])].map((item) => `.${item}`).join('');
};

const getNthSelector = (node: HTMLElement, document: Document) => {
    // console.log('ooOoo', node, node.parentElement);
    // console.dir(node);
    if (!node.parentElement) return node.tagName;
    const index = [...node.parentElement!.children].findIndex((item) => item === node);
    return `> :nth-child(${index + 1})`;
};

const getNodeSelector = (node: HTMLElement, document: Document) => {
    // 递归遍历父节点，直到根节点
    const classSelector = getClassSelector(node, document);
    const nthSelector = getNthSelector(node, document);
    if (node.tagName === 'body') return 'body';
    if (!classSelector) return nthSelector;
    const query = document.querySelectorAll(classSelector);
    return query.length === 1 ? classSelector : nthSelector;
};

export const getSelectors = (node: HTMLElement) => {
    const seqs: string[] = [];
    let parent = node;
    while (parent) {
        const seq = getNodeSelector(parent, node.ownerDocument);
        // console.log(':::::', seq, parent);
        seqs.push(seq);
        // 计算selector的唯一性, 减短selector路径
        const selector = seqs.toReversed().join(' ');
        if (!/^\>/.test(selector) && document.querySelectorAll(selector).length) break;
        if (parent.tagName === 'body') break;
        parent = parent.parentElement!;
    }

    return seqs.toReversed().join(' ');
};
