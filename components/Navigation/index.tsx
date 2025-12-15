import { Horizontal, Vertical } from '../Sidebar'

const Navigation = () => {
  return (
      <>
        {/* Desktop Sidebar (Left side) */}
        <nav className="hidden h-full md:block md:col-start-1 md:col-end-4 nav_wrapper border-r border-gray-800">
          <Vertical/>
        </nav>

        {/* Mobile Bottom Bar (Fixed) */}
        <nav 
          className="block fixed bottom-0 left-0 w-full z-50 md:hidden border-t border-gray-800 bg-[#121212]/95 backdrop-blur-md"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} /* This fixes the iPhone bottom bar issue */
        >
          <Horizontal/>
        </nav>
      </>
  )
}

export default Navigation
