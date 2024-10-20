import axios from "axios";

const Admin = () => {
  const resetValue = async () => {
    if (!confirm("Are you sure you want to reset all values to default?")) {
      return;
    }

    axios
      .put("http://localhost:3000/api/reset")
      .then(() => {
        alert("All values have been reset to default");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-5 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-xl border border-orange-400">
        <h1 className="text-2xl font-bold mb-4 text-orange-400">Edit Page</h1>
        <div className="flex flex-wrap gap-4">
          <a
            href="edit-page/home"
            className="text-lg text-orange-500 hover:text-orange-600 underline"
          >
            Home Page
          </a>
          <a
            href="edit-page/career"
            className="text-lg text-orange-500 hover:text-orange-600 underline"
          >
            Career Page
          </a>
          <a
            href="edit-page/contact"
            className="text-lg text-orange-500 hover:text-orange-600 underline"
          >
            Contact Page
          </a>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl border border-orange-400">
        <h1 className="text-2xl font-bold mb-4 text-orange-400">Edit Data</h1>
        <div className="flex flex-wrap gap-4">
          <a
            href="edit-data/meals"
            className="text-lg text-orange-500 hover:text-orange-600 underline"
          >
            Meals
          </a>
          <a
            href="edit-data/drinks"
            className="text-lg text-orange-500 hover:text-orange-600 underline"
          >
            Drinks
          </a>
          <a
            href="edit-data/gallery"
            className="text-lg text-orange-500 hover:text-orange-600 underline"
          >
            Gallery
          </a>
          <button
            onClick={resetValue}
            className="text-lg text-red-500 hover:text-red-600 underline"
          >
            Reset all values to default
          </button>
        </div>
      </div>
    </main>
  );
};

export default Admin;
