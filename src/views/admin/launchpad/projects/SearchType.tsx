/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'

import SelectV3, { SelectOptionProps } from './SearchCollection'

const LIMIT = 5

const useIntersectionObserver = (isDataLoading: boolean) => {
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
  
    const observer = useRef<IntersectionObserver | null>(null)
  
    const lastEntryRef = useCallback(
      (node: Element | null) => {
        if (isDataLoading) return
  
        if (observer.current) observer.current.disconnect()
  
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            // update page.
            setPage((prev) => prev + 1)
          }
        })
  
        if (node) observer.current.observe(node)
      },
      [isDataLoading, hasMore]
    )
  
    return { lastEntryRef, setHasMore, setPage, page }
  }

function SelectType() {
  const [selectedOption, setSelectedOption] = useState<SelectOptionProps>({ label: '', value: '' })
  const [productOptions, setProductOptions] = useState<SelectOptionProps[]>([])
  const [isFetchingProducts, setIsFetchingProducts] = useState(true)
  const [totalItems, setTotalItems] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput, setDebouncedSearchInput] = useState('')

  const handleSelect = (option: SelectOptionProps) => {
    setSearchInput(option?.label)
    setSelectedOption(option)
  }

  const transformProductToSelectOptions = (products: { title: string; id: number }[]) => {
    if (!products) return []

    return products?.map((product) => {
      return {
        label: `${product?.title}`,
        value: product?.id?.toString(),
      }
    })
  }

  const { lastEntryRef, setHasMore, setPage, page } = useIntersectionObserver(isFetchingProducts)

  useEffect(() => {
    if (totalItems === 0) return
    if (!isFetchingProducts) {
      setHasMore(productOptions?.length < totalItems)
    }
  }, [productOptions, totalItems])

  const getSkipValue = () => {
    return (page - 1) * LIMIT
  }

  const getApiUrl = () => {
    if (debouncedSearchInput) {
      return `https://dummyjson.com/products/search?q=${debouncedSearchInput}&limit=${LIMIT}&skip=${getSkipValue()}`
    } else {
      return `https://dummyjson.com/products?limit=${LIMIT}&skip=${getSkipValue()}`
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setProductOptions([])
      setPage(1)
      setDebouncedSearchInput(searchInput)
    }, 500) // delay fetching by 500ms

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchInput])

  const fetchAndSetProducts = async () => {
    try {
      setIsFetchingProducts(true)
      const response = await fetch(getApiUrl())
      const data = await response.json()

      if (page === 1) setProductOptions([])

        console.log(data?.products);
        
        setProductOptions((prev) => [...prev, ...transformProductToSelectOptions(data?.products)])
      setTotalItems(data?.total)
    } catch (error) {
      alert('Something went wrong')
      console.log({ error })
    } finally {
      setIsFetchingProducts(false)
    }
  }

  useEffect(() => {
    fetchAndSetProducts()
  }, [page, debouncedSearchInput])

  return (
    <div className='p-20'>
      <div className='block w-52'>
        <span className='block mb-2 text-sm'>Select product</span>
        <SelectV3
          options={productOptions}
          selected={selectedOption}
          placeholder='Select product'
          handleSelect={handleSelect}
          isFetchingOptions={isFetchingProducts}
          lastOptionRef={lastEntryRef}
          isSearchable={true}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>
    </div>
  )
}

export default SelectType