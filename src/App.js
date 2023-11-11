import NavBar from "./components/NavBar/NavBar";
import data from "./data/data.json";

function App() {
    function handleClick(children) {
        console.log('Clicked: ', children)
    }
    
    return (
        <div className="App">
            <NavBar items={data} handleClick={ handleClick }></NavBar>
        </div>
    );
}

export default App;
