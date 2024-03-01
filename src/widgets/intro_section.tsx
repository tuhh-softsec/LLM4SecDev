const IntroSection = () => {
  return (
    <div className="my-4 rounded border-2 p-2 drop-shadow-sm text-justify">
      <div>
        This database is supposed to support researchers and LLM enthusiasts to
        explore the use of LLMs in the following domains:
        <ol className="list-decimal mx-4 p-2">
          <li>
            LLM for secure development. This includes all kinds of tasks that
            are related to prediction of security features, code generation, or
            program repair.
          </li>
          <li>Attacks to LLMs that are relevent for software development.</li>
        </ol>
      </div>
      <div>
        Contributions of any kind are wellcome through our{" "}
        <a
          href="https://github.com/tuhh-softsec/LLM4SecDev"
          className="hover:text-sky-600"
        >
          GitHub repository
        </a>
        .
      </div>
    </div>
  );
};

export default IntroSection;
