import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="border-b border-ink-700 bg-ink-900 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-mono font-medium text-lime-400 tracking-tight">
          task<span className="text-ink-100">flow</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className={`transition-colors ${
              pathname === "/"
                ? "text-lime-400"
                : "text-ink-300 hover:text-ink-100"
            }`}
          >
            Tarefas
          </Link>
          <Link
            to="/nova"
            className={`transition-colors ${
              pathname === "/nova"
                ? "text-lime-400"
                : "text-ink-300 hover:text-ink-100"
            }`}
          >
            Nova tarefa
          </Link>
        </nav>
      </div>
    </header>
  );
}