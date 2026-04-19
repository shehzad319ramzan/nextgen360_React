export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[300px]">
      <div className="relative w-10 h-10 mb-4">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
        <div className="absolute inset-0 rounded-full border-[3px] border-[#0F4C8F] border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-gray-400 animate-pulse">{text}</p>
    </div>
  );
}
