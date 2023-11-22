import sty from './todos.module.less';
import { Met, MetFlex } from '@hulu/met';
import { TodoItem } from './todo-item';
import { todoListState } from './store';
import { TodosAction } from './todos-action';
import { TodoInput } from '@/views/todos/todo-input';

export type StateAction = Record<'add' | 'delete' | 'update', any>;
const TodosContainer = () => {
    const todoList = useRecoilValue(todoListState);
    return (
        <Met className={sty['todos']} br={8} comment="Todo Container">
            <MetFlex className={sty['title']} placement="center" comment="Todo Header" align="center">
                <Met fw={200}>Todos</Met>
                <Met ml={9} fs={20} fw={200}>
                    React + Recoil + URLSync + Localforage
                </Met>
            </MetFlex>
            <Met className={sty['main']}>
                <Met className={sty['input']} comment="Todo Input">
                    <TodoInput />
                </Met>
                <Met className={sty['list']} comment="Todo List">
                    {todoList.map((item, inx) => (
                        <TodoItem key={`${item.title}-${inx}`} item={item} inx={inx} />
                    ))}
                </Met>
            </Met>
            <MetFlex p={16} className={sty.footer}>
                <Met color={'#aaa'}>{todoList.length} items left</Met>
                <MetFlex placement={'center'} flex={1}>
                    <TodosAction />
                </MetFlex>
            </MetFlex>
        </Met>
    );
};

const Todos = () => {
    return (
        <Met tag={'article'} pt={30}>
            <TodosContainer />
        </Met>
    );
};

export default Todos;
