/**
 * 入口文件，超控体系的文件
 * - 若不想使用超控体系的文件，则直接修改import导入地址
 * - 在Promise.all下，如果开启http/2, 可以获得最佳体验
 *
 * 不适用 TopLevel Await 原因
 * 若import的模块中也存在着import, 则 await 处于不工作状态
 */

Promise.all([import('~ck/root'), import('~ck/app')]).then(([{ render }, { App }]) => {
    render(App);
});

export {};
