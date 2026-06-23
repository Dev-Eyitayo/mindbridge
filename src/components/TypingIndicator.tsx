
export function TypingIndicator() {
  return (
    <span className="flex items-center gap-1.5" aria-label="MindBridge is typing">
      <span className="w-1.5 h-1.5 rounded-full bg-subtle typing-dot" />
      <span className="w-1.5 h-1.5 rounded-full bg-subtle typing-dot" />
      <span className="w-1.5 h-1.5 rounded-full bg-subtle typing-dot" />
    </span>
  );
}