import Footer from "./footer";
import NavBar from "./nav-bar";

export default function AppLayouty({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <NavBar />
      <div className="h-[calc(100%-5rem)]">{children}</div>
      <Footer />
    </div>
  );
}
