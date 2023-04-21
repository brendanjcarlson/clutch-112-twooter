const Container = ({ children, className }) => {
  return (
    <div className={`container mx-auto px-4 ${className}`}>{children}</div>
  );
};

export const AppContainer = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen bg-slate-300 pt-12">
      {children}
    </div>
  );
};

export default Container;
