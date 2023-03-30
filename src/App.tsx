import React from "react";

function App() {
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="text-5xl text-stone-950 font-mono">TODO</div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-info w-full max-w-xs"
      />
    </div>
  );
}

export default App;
