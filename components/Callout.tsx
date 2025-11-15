export default function Callout({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "info" | "warning";
}) {
  const colors = {
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
  };
  return <div className={`p-4 rounded my-4 ${colors[type]}`}>{children}</div>;
}
