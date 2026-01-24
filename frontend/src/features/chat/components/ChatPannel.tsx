interface ChatPannelProps {
  open: boolean;
  onClose: () => void;
}
function ChatPannel({ open, onClose }: ChatPannelProps) {
  return (
    <>
      {/* Panel */}
      <div
        className={`fixed bottom-10 rounded-2xl right-0 h-96 w-80 bg-white shadow-xl transform transition-transform
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Code Kampuchea</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between h-80">
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto mb-2">
            <p className="text-gray-500">Welcome to chat!</p>
          </div>

          {/* Input */}
          <div className="">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full border rounded p-2"
            />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPannel;
