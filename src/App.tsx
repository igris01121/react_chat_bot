import React from "react"; 
import  { Chat }  from  './component/chat' ;
function App() {
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
  {
    <Chat />
  }
</div>
  );
}

export default App;