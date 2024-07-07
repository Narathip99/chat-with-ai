import React from "react";
import MessgeBox from "./MessgeBox";

interface ChatProps {
  history: Chat[];
}

interface Chat {
  role: "user" | "model";
  parts: string;
}

const Chats = ({ history }: ChatProps) => {
  return (
    <>
      {history.map((chats, i) => (
        <div key={i}>
          <MessgeBox chats={chats} />
          <div className="bg-zinc-600 h-[1px] bg-opacity-40 w-[90%] mx-auto my-6" />
        </div>
      ))}
    </>
  );
};

export default Chats;
