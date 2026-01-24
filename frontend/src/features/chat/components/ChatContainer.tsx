import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatPannel from "./ChatPannel";

export default function ChatContainer() {
  const [open, setOpen] = useState(false);

  const toggleChat = () => setOpen(!open);

  return (
    <>
      <ChatButton onClick={toggleChat} />
      <ChatPannel open={open} onClose={() => setOpen(false)} />
    </>
  );
}
