const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null)
  
  return (
    <div className='w-full overflow-y-auto'>
      {
        skeletonContacts.map((_, idx) => (
          <div key={idx} className='py-3 flex gap-2'>
            <div className='w-10 h-10 rounded-full bg-gray-200'></div>
            <div className='hidden lg:block'>
              <div className="bg-gray-200 h-4 w-32 mb-2" />
              <div className="bg-gray-200 h-3 w-16" />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default SidebarSkeleton