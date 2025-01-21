import AdminPermission from '@/components/AdminPermission'

export default function AdminLayout({ children }) {
  return <AdminPermission>{children}</AdminPermission>
}
