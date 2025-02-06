import Logo from "@/components/header/Logo";
import Container from "../Container";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="border-b shadow-sm p-4">
      <Container>
        <div className="flex justify-between">
          <Logo />

          <Nav />
        </div>
      </Container>
    </header>
  );
}
