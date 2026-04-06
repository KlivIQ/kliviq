const FooterSection = () => {
  return (
    <footer className="relative py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />
        <p className="text-center text-muted-foreground text-sm">
          <span className="gradient-text font-semibold">Srilancer</span> — Building Tech That Actually Works
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
