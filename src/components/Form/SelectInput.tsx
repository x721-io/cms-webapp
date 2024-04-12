import { FC, useEffect, useRef, useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io"

const Loader = () => {
    return (
        <div className='flex justify-center items-center '>
            <div className='animate-spin rounded-full h-4 w-4 border-t-2 border-black '></div>
        </div>
    )
}

export type SelectOptionProps = {
    label: string // displayed label
    value: string // value used in computatio
    type: string
}

type SelectProps = {
    options: SelectOptionProps[] // an array of the options.
    selected?: SelectOptionProps // the selected option.
    handleSelect: (option: SelectOptionProps) => void // function that is called when an option is selected.
    placeholder?: string
    isFetchingOptions?: boolean
    isSearchable?: boolean
    searchInput?: string
    lastOptionRef?: (node: Element | null) => void
    setSearchInput?: React.Dispatch<React.SetStateAction<string>>
}

const useListenForOutsideClicks = (onOutsideClick: () => void) => {
    const elementRef = useRef<any>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                onOutsideClick?.()
            }
        }
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [onOutsideClick])

    return { elementRef }
}

const SelectInput: FC<SelectProps> = ({
    options,
    isFetchingOptions,
    lastOptionRef,
    isSearchable,
    searchInput,
    selected = { label: '', value: '' },
    placeholder = 'Select',
    handleSelect,
    setSearchInput,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const openDropdown = () => {
        setIsDropdownOpen(true)
    }

    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    const labelClassName = () => {
        return `block max-w-full capitalize truncate ${selected?.label ? 'text-text-tertiary' : 'text-neutral/400'}`
    }

    const optionClassName = (option: SelectOptionProps, index: number, isSelected: boolean) => {
        isSelected ||= selected?.value === option.value

        return `active:bg-background-selected-option relative cursor-default select-none py-2 px-4 ${options.length - 1 === index ? 'rounded-b-md' : ''
            } ${isSelected ? 'bg-secondary/blue/50' : ''} hover:bg-secondary/blue/50 mb-1 last-of-type:mb-[0] block text-left w-full`
    }

    const { elementRef } = useListenForOutsideClicks(closeDropdown)

    const renderNoOptions = () => {
        if (isFetchingOptions) return <Loader />

        return (
            <div className='relative cursor-default select-none py-2 pl-3 pr-9'>
                <span className='font-normal block truncate text-sm text-text-tertiary'>No options here</span>
            </div>
        )
    }

    const renderOptions = (options: SelectOptionProps[]) => {
        return options?.length > 0
            ? options?.map((option, index) => {
                const isSelected = selected?.value === option.value

                return (
                    <button
                        type='button'
                        key={String(option.value) + String(index)}
                        className={optionClassName(option, index, selected?.value === option.value)}
                        onClick={() => {
                            handleSelect(option)
                            closeDropdown()
                        }}
                        ref={options?.length - 1 === index ? lastOptionRef : null}
                    >
                        <span
                            title={option.label}
                            className={`${isSelected ? 'font-semibold ' : 'font-normal'
                                } block truncate text-text-tertiary text-[0.625rem] cursor-pointer leading-[0.8rem] text-shades/black font-normal`}
                        >
                            {option.label}
                        </span>
                    </button>
                )
            })
            : renderNoOptions()
    }

    return (
        <div className='relative grow'>
            <button onClick={openDropdown} className="w-full" type='button'>
                {isSearchable ? (
                    <input
                        type='text'
                        className='block border-gray-300 border outline-none placeholder:text-gray-200 placeholder:font-light focus-visible:ring-[0.5px] w-full transition-all text-base rounded-2xl min-w-72 h-12 p-3'
                        onChange={(ev) => {
                            setSearchInput?.(ev.target.value)
                        }}
                        placeholder={placeholder}
                        value={searchInput}
                    />
                ) : (
                    <span title={selected?.label} className={labelClassName()}>
                        {selected?.label || placeholder}
                    </span>
                )}
                <span className='pointer-events-none ml-3 flex items-center absolute right-2 bottom-3'>
                    <IoMdArrowDropdown size={24} className=" text-[#96989A]" />
                </span>
            </button>

            {isDropdownOpen && (
                <div
                    className={
                        'absolute z-[500] w-full overflow-auto rounded-b-md bg-white py-[14px] text-base ring-opacity-5 focus:outline-none mt-1 max-h-40 rounded-lg'
                    }
                    style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)' }}
                    ref={elementRef}
                >
                    {renderOptions(options)}

                    {isFetchingOptions && options?.length > 0 && <Loader />}
                </div>
            )}
        </div>
    )
}

export default SelectInput