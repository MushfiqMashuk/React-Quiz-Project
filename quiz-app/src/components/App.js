import "../styles/App.css";
import Layout from "./Layout";
//import Home from "./pages/Home";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Layout>
        <Signup />
      </Layout>
    </div>
  );
}

export default App;
