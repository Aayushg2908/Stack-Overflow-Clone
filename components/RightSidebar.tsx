export const RightSidebar = () => {
  return (
    <div className="dark:bg-[#0F1117] sticky top-0 right-0 flex flex-col overflow-y-auto border-1 pt-36 p-6 shadow-md dark:shadow-none w-[300px] max-xl:hidden">
      <div>
        <div className="font-bold text-2xl">Top Questions</div>
      </div>
      <div>
        <div className="font-bold text-2xl">Popular Tags</div>
      </div>
    </div>
  );
};
