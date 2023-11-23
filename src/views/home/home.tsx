import { useQuery } from '~ck';

const Home = () => {
    const [{ a }] = useQuery();
    return (
        <article>
            <header>Home Asas {a}</header>
        </article>
    );
};

export default Home;
