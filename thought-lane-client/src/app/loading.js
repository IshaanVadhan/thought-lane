export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-dark-100 z-50">
      <div className="spinner border-t-4 border-purple-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
}
