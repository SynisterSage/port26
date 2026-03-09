import { useEffect, useMemo, useRef } from "react";
import { projects } from "./content/projects";

const Content = () => {
  const shortlist = useMemo(
    () =>
      projects.map((project) => ({
        title: project.title,
        link: project.link,
        description: project.description,
      })),
    [],
  );

  return (
    <main>
      <header>
        <h1>Lex Ferguson</h1>
      </header>

      <section>
        <ul>
          <li>Creative Technologist - Making products in design and engineering.</li>
          <li>lexferguson@icloud.com</li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              linkedin.com
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2>Project Shortlist</h2>
        <hr />
        <ul>
          {shortlist.map((item) => (
            <li key={item.title}>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              ) : (
                item.title
              )}
              {" - "}
              {item.description}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Archive</h2>
        <hr />
        <ul>
          <li>Dominos App Redesign - UX flow + prototype systems.</li>
          <li>Overtone App - Web Audio drum tuning experience.</li>
          <li>GridLead - full stack local business audit platform.</li>
        </ul>
      </section>

      <footer>
        <p>Happy to chat, reach out.</p>
      </footer>
    </main>
  );
};

function App() {
  const centerContentRef = useRef<HTMLDivElement | null>(null);
  const centerFoldRef = useRef<HTMLDivElement | null>(null);
  const topContentRef = useRef<HTMLDivElement | null>(null);
  const bottomContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const centerContent = centerContentRef.current;
    const centerFold = centerFoldRef.current;
    const layers = [topContentRef.current, centerContentRef.current, bottomContentRef.current].filter(
      Boolean,
    ) as HTMLDivElement[];

    if (!centerContent || !centerFold || layers.length === 0) return;

    const originalBodyHeight = document.body.style.height;
    let raf: number | undefined;

    const updateBodyHeight = () => {
      const scrollableHeight = centerContent.clientHeight - centerFold.clientHeight;
      document.body.style.height = `${Math.max(0, scrollableHeight) + window.innerHeight}px`;
    };

    const tick = () => {
      const offsetY = -(window.scrollY || document.documentElement.scrollTop || 0);
      layers.forEach((layer) => {
        layer.style.transform = `translateY(${offsetY}px)`;
      });
      raf = window.requestAnimationFrame(tick);
    };

    const handleResize = () => {
      updateBodyHeight();
    };

    window.addEventListener("resize", handleResize);
    updateBodyHeight();
    tick();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (raf) window.cancelAnimationFrame(raf);
      document.body.style.height = originalBodyHeight;
    };
  }, []);

  return (
    <div className="app-all">
      <div className="wrapper3d">
        <div className="fold fold-top">
          <div className="fold-align">
            <div data-fold-content="true" ref={topContentRef}>
              <Content />
            </div>
          </div>
        </div>

        <div className="fold center-fold" ref={centerFoldRef}>
          <div className="fold-align">
            <div data-fold-content="true" ref={centerContentRef}>
              <Content />
            </div>
          </div>
        </div>

        <div className="fold fold-bottom">
          <div className="fold-align">
            <div data-fold-content="true" ref={bottomContentRef}>
              <Content />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
