import { MonitorX } from "lucide-react";
import "./App.css";
import MenuModal from "./components/customUi/Menu";
import Navbar from "./components/customUi/Navbar";

function App() {
    return (
        <>
            <header className='bg-black'>
                <div className='maximum-w p-4 flex justify-between items-center'>
                    <h1 className='text-xl'>Todo App</h1>

                    <Navbar />
                </div>
            </header>

            <MenuModal>
                <MenuModal.ModalTrigger>
                    <MonitorX />
                </MenuModal.ModalTrigger>

                <MenuModal.ModalContent>
                    <section>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quaerat, impedit.
                        </div>
                    </section>
                </MenuModal.ModalContent>
            </MenuModal>
        </>
    );
}

export default App;
