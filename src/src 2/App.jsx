import Swags from "./components/swags";
import { useGetAllSwagsQuery } from "./components/app/swagsApi"

function App() {
  const { isLoading } = useGetAllSwagsQuery();

  return <div>{isLoading ? <h1>Loading...</h1> : <Swags />}</div>;
}

export default App;
