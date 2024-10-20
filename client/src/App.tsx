import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Gallery from "./pages/Gallery";
import GiftVouchers from "./pages/GiftVouchers";
import EditHomePage from "./pages/EditHomePage";
import EditCareerPage from "./pages/EditCareerPage";
import EditContactPage from "./pages/EditContactPage";
import EditMeals from "./pages/EditMeals";
import EditDrinks from "./pages/EditDrinks";
import EditGallery from "./pages/EditGallery";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="career" element={<Career />} />
        <Route path="contact" element={<Contact />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="admin" element={<Admin />} />
        <Route path="vouchers" element={<GiftVouchers />} />
        <Route path="edit-page/home" element={<EditHomePage />} />
        <Route path="edit-page/career" element={<EditCareerPage />} />
        <Route path="edit-page/contact" element={<EditContactPage />} />
        <Route path="edit-data/meals" element={<EditMeals />} />
        <Route path="edit-data/drinks" element={<EditDrinks/>} />
        <Route path="edit-data/gallery" element={<EditGallery/>} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
