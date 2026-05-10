const FooterSection = () => {
  return (
    <footer className="relative py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
        <p className="text-center text-muted-foreground text-sm">
          <span className="font-semibold">
            <span className="text-foreground">Kliv</span>
            <span className="text-brand-cyan">IQ</span>
          </span>{" "}
          — Building Tech That Actually Works
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
