import { Albums } from "../components/Albums/Albums";
import { Header } from "../components/Header/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <section className="home">
        <Albums />
      </section>
    </div>
  );
};
export default Home;
