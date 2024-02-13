import { Albums } from "../components/albums/Albums";
import { Header } from "../components/header/Header";

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
