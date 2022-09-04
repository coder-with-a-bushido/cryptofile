const Loading = () => {
  return (
    <div class="flex items-center justify-center ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-20 h-20 text-red-600 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
          fill="black"
        />
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
export default Loading;
