import ReactMarkdown from "react-markdown";
import CodeHighlighter from "./CodeHighlighter";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatProps {
  chats: Chat;
}

interface Chat {
  role: "user" | "model";
  parts: string;
}

const MessgeBox = ({ chats }: ChatProps) => {
  return (
    <div
      className={`flex gap-3 ${
        chats.role === "user" ? "flex-row-reverse" : ""
      }`}
    >
      <div>
        {chats.role === "user" ? (
          <Avatar>
            <AvatarFallback></AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        )}
      </div>

      <div>
        <span className="font-bold mb-1">
          {chats.role === "user" ? "You" : "Gemini"}
        </span>
        <ReactMarkdown
          className="flex flex-col gap-4"
          components={{
            code({ children, inline, className, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              let language;

              if (match && match[1]) {
                language = match[1];
              } else {
                language = "jsx";
              }

              return !inline && match ? (
                <CodeHighlighter language={language}>{children}</CodeHighlighter>
              ) : (
                <code
                  className="bg-gray-800 text-white px-2 py-[1px] leading-loose rounded"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {chats.parts}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessgeBox;
