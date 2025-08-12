import "./App.css";
import Navbar from "./components/customUi/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <>
            <header className='bg-black'>
                <div className='maximum-w p-4 flex justify-between items-center'>
                    <h1 className='text-xl'>Todo App</h1>

                    <Navbar />
                </div>
            </header>

            <Home />
        </>
    );
}

export default App;
