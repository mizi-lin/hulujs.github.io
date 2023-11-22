import { Met } from '@hulu/met';
import { todoListState } from './store';

export const TodoInput = () => {
    const setTodoList = useSetRecoilState(todoListState);
    const [temp, setTemp] = useState('');

    const addTodo = () => {
        setTodoList([{ add: temp }]);
        setTemp('');
    };

    const changeTemp = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setTemp(value);
    };

    return (
        <Met>
            <Input
                placeholder={'What needs to be done?'}
                bordered={false}
                size={'large'}
                value={temp}
                onPressEnter={addTodo}
                onChange={changeTemp}
                style={{ fontSize: 20, fontWeight: 200 }}
            />
        </Met>
    );
};
