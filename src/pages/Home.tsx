import { Albums } from "@/components/Albums/albums";
import { Header } from "@/components/Header/header";


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
