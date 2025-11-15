export default function Alert({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "success" | "error";
}) {
  const colors = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };
  return <div className={`p-4 rounded my-4 ${colors[type]}`}>{children}</div>;
}
