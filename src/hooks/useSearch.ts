import { useMemo, useState } from "react";

export const useSearchCollection = () => {

  const [text, setText] = useState<Record<string, string>>({
    collection: ""
  });

  const searchKey = useMemo(() => {
    return "collection";
  }, []);

  const handleTextInput = async (value: string) => {
    if (!searchKey) return;
    setText({
      ...text,
      [searchKey]: value,
    });
  };

  const searchString = useMemo(
    () => (searchKey ? text[searchKey] : ""),
    [searchKey, text],
  );

  return {
    handleTextInput,
    searchKey,
    text,
    searchString,
  };
};

// import { TabsRef } from "flowbite-react";
// import { useMemo, useRef, useState } from "react";

// export const useSearchCollection = () => {
//   const tabsRef = useRef<TabsRef>(null);
//   const [openModal, setOpenModal] = useState(false);

//   const [text, setText] = useState<string>("");


//   const handleTextInput = async (value: string) => {
//     setText(value);
//   };

//   const searchString = useMemo(() => text, [text]);

//   return {
//     handleTextInput,
//     tabsRef,
//     openModal,
//     setOpenModal,
//     searchString,
//   };
// };

