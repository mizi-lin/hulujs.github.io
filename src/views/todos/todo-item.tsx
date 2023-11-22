import { Div, Label, Met, Span } from '@hulu/met';
import { todoListState } from './store';
import sty from './todos.module.less';
export const TodoItem: FC<{ item: Record<string, any>; inx: number }> = ({ item, inx }) => {
    const { title, status } = item;
    const setTodoList = useSetRecoilState(todoListState);
    const toggleTodo = (record: Record<string, any>, inx: number) => {
        const status = record.status === 'active' ? 'done' : 'active';
        setTodoList([{ update: { ...record, status } }]);
    };

    return (
        <Div className={clx(sty['list-item'], sty[`status-${status}`])} comment={`Todo List Item: ${inx}`}>
            <Label>
                <Space>
                    <Radio
                        checked={status === 'done'}
                        onClick={() => {
                            toggleTodo(item, inx);
                        }}
                    />
                    <Span>oo {title}</Span>
                </Space>
            </Label>
        </Div>
    );
};
