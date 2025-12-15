import { useState, useEffect } from 'react'
import Manga from '../components/utils/Manga'

const useGetSearchResults = (searchText: string): [boolean, Manga[]] => {
  const [loading, changeLoading] = useState<boolean>(false)
  const [results, changeResults] = useState<Manga[]>([])

  useEffect(() => {
    // If the search text is empty, clear results and don't search
    if (!searchText || searchText.trim() === '') {
      changeResults([])
      return
    }

    // Set a delay (debounce) of 500ms
    const delayDebounceFn = setTimeout(() => {
      changeLoading(true)

      Manga.searchMangas(searchText)
        .then(res => {
          if (res.result === "ok") {
            const { data } = res
            if (data) changeResults(data)
          }
          changeLoading(false)
        })
        .catch(error => {
          changeLoading(false)
          console.error(error)
        })
    }, 500) // Wait 500ms after user stops typing

    // Cleanup function: If user types again before 500ms, cancel the previous timer
    return () => clearTimeout(delayDebounceFn)
    
  }, [searchText])

  return [loading, results]
}

export { useGetSearchResults }
