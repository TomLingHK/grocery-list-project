import NavBar from "./components/NavBar/NavBar";
import data from "./data/data.json";

function App() {
  return (
    <div className="App">
        <NavBar items={data}></NavBar>
    </div>
  );
}

export default App;
