export default function Footer() {
  return (
    <footer className="border-t border-slate-700 px-8 py-4">
      {/* Footer text */}
      <p className="text-center text-sm sm:text-base">
        <span className="text-slate-50/80">Built by</span>{" "}
        {/* Portfolio link */}
        <a
          href="https://iamcamilomillan.vercel.app/"
          target="_blank"
          className="font-medium transition-colors duration-200 ease-in-out hover:text-slate-50/80"
        >
          Camilo Millan
        </a>{" "}
        {/* Dot divider */}
        <span className="text-slate-50/80">&#8226;</span>{" "}
        {/* Project repository link */}
        <a
          href="https://github.com/iam-camilomillan/what-to-do"
          target="_blank"
          className="font-medium transition-colors duration-200 ease-in-out hover:text-slate-50/80"
        >
          Project repository
        </a>
        {/* Final dot */}
        <span className="text-slate-50/80">&#46;</span>
      </p>
    </footer>
  );
}