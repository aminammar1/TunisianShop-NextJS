import UserMenu from '@/components/user-menu/UserMenu'

export default function DashboardLayout({ children }) {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
        {/** Left for menu */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r">
          <UserMenu />
        </div>

        {/** Right for content */}
        <div className="bg-white min-h-[75vh]">{children}</div>
      </div>
    </section>
  )
}
