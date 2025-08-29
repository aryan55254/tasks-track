import Footer from "../Components/Footer";
import Header from "../Components/Header";
import NavComp from "../Components/NavComp";
import InputText from "../Components/InputArea";
function AllTask() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <InputText />
      </main>
      <NavComp />
      <Footer />
    </div>
  );
}

export default AllTask;
