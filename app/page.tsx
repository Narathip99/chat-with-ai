"use client";

//
import { run } from "@/utils/action";
import { useState } from "react";

//components
import Chats from "@/components/Chats";
import InitialUI from "@/components/InitialUI";
import Typing from "@/components/Typing";
import { Input } from "@/components/ui/input";
import { ImagePlus, Mic, SendHorizonal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

// icon
import { AlignJustify } from "lucide-react";

// interface
interface Chat {
  role: "user" | "model";
  parts: string;
}

export default function Home() {
  const [userPrompt, setUserPrompt] = useState("");
  const [typing, setTyping] = useState(false);
  const [history, setHistory] = useState<Chat[]>([]);

  const addChat = (role: Chat["role"], parts: string) => {
    const newChat: Chat = { role, parts };
    setHistory((prevHistory) => [...prevHistory, newChat]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTyping(true);
    addChat("user", userPrompt);
    const response = await run(userPrompt, history);
    console.log(response);

    setUserPrompt("");
    addChat("model", response);

    setTyping(false);
  };

  return (
    <div className=" mx-auto h-screen relative flex flex-col">
      <Navbar />

      {/* Chat display */}
      <div className="h-[calc(100vh-180px)] w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] my-6 lg:px-6 lg:pt-4 lg:pb-8 mx-auto max-h-[calc(100vh-100px)] overflow-y-auto scroll-bar flex flex-col gap-4">
        {history.length > 0 ? <Chats history={history} /> : <InitialUI />}
        {typing && <Typing typing={typing} />}
      </div>

      {/* input prompt */}
      <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="px-4 py-2 w-full flex items-center justify-between rounded-lg bg-zinc-200 dark:bg-zinc-800"
        >
          <Input
            autoFocus
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="w-full text-lg bg-transparent dark:bg-transparent placeholder:text-lg placeholder:font-medium border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type here..."
            disabled={typing}
          />
          <div className="flex items-center gap-4 cursor-pointer">
            <SendHorizonal 
              onClick={handleSubmit}
              className="w-6 h-6 cursor-pointer hover:drop-shadow-lg" 
            />
          </div>
        </form>
      </div>
    </div>
  );
}
