import { MetFlex } from '@hulu/met';

export const TodosAction = () => {
    const navigate = useNavigate();
    const { status = '' } = useParams();
    return (
        <MetFlex gap={8}>
            <Button shape={'round'} type={status === '' ? 'primary' : 'default'} onClick={() => navigate('/todos')}>
                All
            </Button>
            <Button
                shape={'round'}
                type={status === 'active' ? 'primary' : 'default'}
                onClick={() => navigate('/todos/active')}
            >
                Active
            </Button>
            <Button
                shape={'round'}
                type={status === 'done' ? 'primary' : 'default'}
                onClick={() => navigate('/todos/done')}
            >
                Done
            </Button>
        </MetFlex>
    );
};
