import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import CarList from "./screens/CarList";
import CarDetail from "./screens/CarDetail";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/cars/:id" element={<CarDetail />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
