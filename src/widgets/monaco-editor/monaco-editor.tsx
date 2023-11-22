import Editor, { Monaco, useMonaco } from '@monaco-editor/react';
import { Ruyi } from '@hulu/msc';
import autoImportsDts from '@/typings/auto-imports.d.ts?raw';
import ckDts from '@/typings/ck.d.ts?raw';
import envDts from '@/typings/env.d.ts?raw';
import globalDts from '@/typings/global.d.ts?raw';
import typeDts from '@/typings/type.d.ts?raw';
import { each } from '@hulu/mu';
import { Met, MetLoading } from '@hulu/met';
import Materials from '../materials';
import { tempCodeState } from './monaco.store';
import { codeMEStore, currentFilePathMEState, instanceState } from '../montage/montage-editor';
import { currentFiberSourceState } from '../montage/montage.store';

// monaco 使用笔记
// https://zhuanlan.zhihu.com/p/590230766
// https://hzm0321.github.io/apaas-front-doc/blog/react-monaco-editor%20%E5%B8%B8%E7%94%A8%E9%85%8D%E7%BD%AE%E9%A1%B9

// editor.getAction('actions.xxx').run()
// 手动调用monaco方法

interface MonacoEditorProps {
    filePath: string;
    save: (txt: string) => void;
}

export interface InsertCodeExport {
    import: string;
    content: string;
}

export interface EditorContent {
    content: string;
    path: string;
}

const initExtraLibs = (monaco: Monaco) => {
    /**
     * Inject Syntax Hints
     * @api languages.typescript.javascriptDefaults.addExtraLib
     * @api languages.typescript.javascriptDefaults.getExtraLibs
     * https://github.com/rick-chou/one-piece-react/blob/f0bbc702b49e5d0d16ed932a7bf8dfcb16053e53/projects/%40rick-repl/README.md?plain=1#L123
     *
     * @todo 进缓存，否则影响首屏加载速度
     */
    const types = import.meta.glob(
        [
            '/node_modules/{react,react-dom}/**/*.{d.ts,json}',
            '/node_modules/@types/{react,react-dom}/**/*.{d.ts,json}',
            '/node_modules/antd/**/*.{d.ts,json}',
            '/node_modules/typescript/**/*.{d.ts,json}',
            '/node_modules/@hulu/**/*.{d.ts,json}'
        ],
        { eager: true, as: 'raw' }
    );

    Object.keys(types).forEach((path) => {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(types[path], `file://${path}`);
        monaco.languages.typescript.javascriptDefaults.addExtraLib(types[path], `file://${path}`);
    });

    each(
        [
            { content: autoImportsDts, path: '/typings/auto-imports.d.ts' },
            { content: ckDts, path: '/typings/ck.d.ts' },
            { content: envDts, path: '/typings/env.d.ts' },
            { content: globalDts, path: '/typings/global.d.ts' },
            { content: typeDts, path: '/typings/type.d.ts' }
        ],
        ({ content, path }) => {
            monaco.languages.typescript.javascriptDefaults.addExtraLib(content, `file://${path}`);
            monaco.languages.typescript.typescriptDefaults.addExtraLib(content, `file://${path}`);
        }
    );
};

const getLanguage = (filePath = '') => {
    const ext = filePath.split('.').at(-1);
    const languageMap: Record<string, string> = {
        ts: 'typescript',
        tsx: 'typescript',
        js: 'javascript',
        jsx: 'javascript',
        less: 'less',
        scss: 'scss',
        css: 'css'
    };
    return languageMap[ext!] ?? 'typescript';
};

const MonacoEditor: FC<MonacoEditorProps> = (props) => {
    const { filePath, save } = props;

    const { contents } = useRecoilValueLoadable(codeMEStore(filePath));

    // 物料窗口
    const [openMaterial, setOpenMaterial] = useState();
    // 当前文件信息
    const { source } = useRecoilValue(instanceState);
    const [temp, setTemp] = useRecoilState(tempCodeState(filePath));

    const editorRef = useRef(null);
    const monaco = useMonaco();

    const inserCode = (exports: InsertCodeExport) => {
        const editor = editorRef.current;
        const { lineNumber, column } = editor.getPosition();
        const { endLineNumber, endColumn } = editor.getSelection();

        editor.executeEdits('insert-code', [
            {
                range: {
                    startLineNumber: lineNumber || 0,
                    startColumn: column || 0,
                    endLineNumber: endLineNumber || lineNumber || 0,
                    endColumn: endColumn || column || 0
                },
                text: ` ${exports.content}`
            }
        ]);

        editor.executeEdits('insert-imports', [
            {
                range: {
                    startLineNumber: 0,
                    startColumn: 0,
                    endLineNumber: 0,
                    endColumn: 0
                },
                text: `${exports.import} `
            }
        ]);

        editor.getAction('editor.action.formatDocument').run();

        setOpenMaterial(false);
    };

    const handleEditorDidMount = (editor: any, monaco: Monaco) => {
        editorRef.current = editor;

        // 添加键盘事件，按住 ctrl + s 保存代码
        editor.addAction({
            id: 'save',
            label: 'Save 保存',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
            precondition: null,
            keybindingContext: null,
            contextMenuGroupId: 'montage',
            contextMenuOrder: 1.5,
            run: (editor: any, monaco: Monaco) => {
                const { lineNumber, column } = editor.getPosition();
                editorRef.content = editor.getValue();
                save(editorRef.content);
            }
        });

        editor.addAction({
            id: 'material',
            label: 'Material 物料',
            precondition: null,
            keybindingContext: null,
            contextMenuGroupId: 'montage',
            contextMenuOrder: 1.5,
            run: (editor: any, monaco: Monaco) => {
                setOpenMaterial(true);
            }
        });
    };

    useEffect(() => {
        if (!monaco) {
            return;
        }

        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            diagnosticCodesToIgnore: [
                1108, 1308,
                // remove dynamic import error
                1323,
                // silence type declarations not found for dynamic import
                2307
            ],
            noSemanticValidation: false,
            noSyntaxValidation: false
        });

        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.Latest,
            module: monaco.languages.typescript.ModuleKind.ESModule,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            importHelpers: true,
            jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
            allowJs: true,
            baseUrl: './',
            lib: ['ES6', 'ES7', 'ESNext', 'DOM', 'DOM.Iterable', 'ScriptHost'],
            sourceMap: true,
            esModuleInterop: true,
            experimentalDecorators: true,
            allowNonTsExtensions: true,
            allowSyntheticDefaultImports: true,
            removeComments: false,
            skipLibCheck: true,
            noImplicitAny: false,
            resolveJsonModule: true,
            strictNullChecks: false,
            types: ['node', 'vite/client'],
            typeRoots: ['src/typings', 'node_modules/@types']
        });

        initExtraLibs(monaco);
    }, [monaco]);

    useEffect(() => {
        if (!editorRef.current) return void 0;
        console.log('ooOoo --:::->');
        const editor = editorRef.current;
        editor.focus();
    }, [editorRef.current]);

    return (
        <Met h={'100%'} data-met-montage-ignore>
            <Editor
                language={getLanguage(filePath)}
                value={temp ?? contents?.content}
                path={filePath}
                // 当编辑器载入的文件与instance  source 一致时，代码跳转到lineNumber
                line={filePath === source.fileName ? source.lineNumber : 0}
                theme={'vs-dark'}
                height="100%"
                loading={<MetLoading h={300} />}
                options={{
                    fontSize: 16,
                    selectOnLineNumbers: true,
                    scrollBeyondLastLine: false
                }}
                onMount={handleEditorDidMount}
                onChange={(content) => {
                    setTemp(content!);
                }}
                // beforeMount={handleEditorWillMount}
                // editorWillMount={handleEditorWillMount}
                // editorDidMount={handleEditorDidMount}
                data-met-montage-ignore
            />

            {openMaterial && (
                <Materials open={openMaterial} onCancel={() => setOpenMaterial(false)} onExport={inserCode} />
            )}
        </Met>
    );
};

export default MonacoEditor;
