import { LeftSidebar } from "@/components/LeftSidebar";
import { Navbar } from "@/components/Navbar";
import { RightSidebar } from "@/components/RightSidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-full">
      <Navbar />
      <div className="w-full h-full flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default MainLayout;
