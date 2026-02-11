// Entry point for Stack Composer UI
import ReactDOM from "react-dom/client";
import "./index.css";
import Settings from "./pages/Settings";
import Wizard from "./pages/Wizard";

const App = () => (
	<div className="min-h-screen bg-white">
		<Wizard />
		<Settings />
	</div>
);

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(<App />);
} else {
	throw new Error("Root element with id 'root' not found.");
}
