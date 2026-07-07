import AuthGuard from "@/components/common/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard allowedRoles={["admin"]}>{children}</AuthGuard>;
}
