'use client'

import EditorProvider from '@/providers/editor/editor-provider'
import usePageEditor from '@/hooks/usePageEditor'
import { type PageDetailStorage } from '@/types/database/pages'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PageEditorNavigation from '@/components/pageEditor/page-editor-navigation'
import PageEditor from '@/components/pageEditor/editor'
import PageEditorSidebar from '@/components/pageEditor/page-editor-sidebar'

interface Props {

}

export default function Page () {
  const searchParmas = useSearchParams()
  const [pageDetails, setPageDetails] = useState<PageDetailStorage>()
  const [loading, setLoading] = useState<boolean>(true)
  const { getPageDetails } = usePageEditor()
  const pageID = searchParmas.get('pageID')

  if (!pageID) throw new Error('Page ID is required')

  useEffect(() => {
    const getPage = async () => {
      try {
        const response = await getPageDetails(pageID)
        setPageDetails(response)
      } catch (error: any) {
        throw new Error(error.message)
      } finally {
        setLoading(false)
      }
    }

    getPage()
  }, [searchParmas])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!pageDetails) {
    throw new Error('page could not be found')
  }

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden"
      suppressContentEditableWarning={true}
      suppressHydrationWarning
    >
      <EditorProvider  pageDetails={pageDetails}>
        <PageEditorNavigation PageDetails={pageDetails} />
        <div className="h-full flex justify-center">
          <PageEditor pageDetails={pageDetails} />
        </div>
        <PageEditorSidebar />
      </EditorProvider>
    </div>
  )
}
