const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-600 px-8">
      <p className="mx-auto max-w-7xl py-4 text-center">
        <span className="opacity-80">Built by</span>{" "}
        <a
          href="https://iamcamilomillan.vercel.app/"
          target="_blank"
          className="font-medium transition-opacity duration-200 ease-in-out hover:opacity-80"
        >
          Camilo Millan
        </a>{" "}
        <span className="opacity-80">&#8226;</span>{" "}
        <a
          href="https://github.com/CoGuisMod/what-to-do"
          target="_blank"
          className="font-medium transition-opacity duration-200 ease-in-out hover:opacity-80"
        >
          Project repository
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
