const SideBar = ({ isJsonOpen, onToggleJson, onAddNode }) => {
  return (
    <aside className="w-60 shrink-0 border-r bg-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Node Types</h2>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onAddNode("input")}
            className="rounded-md bg-blue-100 text-blue-800 px-3 py-2 text-sm font-medium hover:bg-blue-200 transition"
          >
            + Input Node
          </button>
          <button
            onClick={() => onAddNode("transform")}
            className="rounded-md bg-yellow-100 text-yellow-800 px-3 py-2 text-sm font-medium hover:bg-yellow-200 transition"
          >
            + Transform Node
          </button>
          <button
            onClick={() => onAddNode("output")}
            className="rounded-md bg-green-100 text-green-800 px-3 py-2 text-sm font-medium hover:bg-green-200 transition"
          >
            + Output Node
          </button>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onToggleJson}
          className="w-full rounded-md border text-gray-700 border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 transition"
        >
          {isJsonOpen ? "Hide JSON Preview" : "Show JSON Preview"}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
