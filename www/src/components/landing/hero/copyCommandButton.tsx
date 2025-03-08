import { useCopyToClipboard } from "@utils/useCopyToClipboard";

const CopyCommandButton = () => {
  const [value, copy, setDelayedCopyText] = useCopyToClipboard();

  function toggleIcon() {
    setDelayedCopyText();
    copy("npx rn-new@latest");
  }

  return (
    <div className="flex bg-gradient-to-br from-yellow-500 to-orange-500 p-1 rounded-[6px] duration-500 shadow-[0_0_3rem_-3rem,0_0_3rem_-3rem] hover:shadow-[-8rem_0_4rem_-1.75rem,8rem_0_4rem_-1.75rem,-1rem_0_2rem_-0.5rem,1rem_0_2rem_-0.5rem] hover:shadow-orange-400">
      <button
        onClick={toggleIcon}
        className="flex cursor-pointer flex-row items-center gap-2 rounded-[6px] bg-black px-2 py-2 text-sm transition-colors duration-300 hover:bg-black/80 md:px-3 md:py-3 md:text-lg lg:px-5 lg:py-4 lg:text-xl text-white"
        title="Copy the command to get started"
        id="command"
      >
        <code id="command-text">npx rn-new@latest</code>
        {!value ? (
          <svg
            id="copy-icon"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        ) : (
          <svg
            id="check-icon"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-6 sm:w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>
    </div>
  );
};

export default CopyCommandButton;
