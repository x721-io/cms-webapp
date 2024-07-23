"use client";

// import CloseIcon from '@/components/Icon/Close'
import { useMemo, useRef, useState } from "react";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { MdClose, MdFileUpload } from "react-icons/md";
import Text from "../Text";
import { classNames } from "@/utils/string";
import Button from "../button";

interface Props {
  className?: string;
  value?: string | Blob;
  onInput?: (file: Blob | undefined) => void;
  loading?: boolean;
  error?: boolean;
  accept?: string;
  maxSize?: number;
}

export default function ImageUploader({
  className,
  value,
  onInput,
  loading,
  error,
  accept,
  maxSize = 100, // 100 MB
}: Props) {
  const [file, setFile] = useState<Blob | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const fileType = useMemo(() => {
    if (!file) return undefined;
    return file.type.split("/")[0];
  }, [file]);

  const previewImage = useMemo(() => {
    if (value) {
      if (typeof value === "string") return value;
      return URL.createObjectURL(value);
    }

    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file, value]);

  const handleInputImage = (files: FileList | null) => {
    if (files && files[0].size < maxSize * 1024 ** 2) {
      onInput?.(files[0]);
      setFile(files[0]);
    } else {
      onInput?.(undefined);
      setFile(undefined);
      toast.error(`File extension is larger than the allowed size`);
    }
  };

  const handleClearFile = () => {
    onInput?.(undefined);
    setFile(undefined);
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const renderFile = () => {
    if (!file) {
      return (
        <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl py-3 dark:!border-navy-700 lg:pb-0">
            <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
            <Text className="text-xl font-bold text-brand-500 dark:text-white">
              Upload Image
            </Text>
            <Text className="mt-2 text-sm font-medium text-gray-600">
              PNG, JPG and GIF files are allowed
              <span className="uppercase">
                {accept?.split(",").join(", ")}
              </span>{" "}
              Max {maxSize}mb.
            </Text>
          </div>
        </div>
      );
    }
    switch (fileType) {
      case "image":
        return (
          <img
            src={previewImage}
            alt=""
            width={256}
            height={256}
            className="m-auto h-full w-auto rounded-2xl object-contain"
          />
        );
      case "video":
        return (
          <video className="h-full w-full rounded-2xl" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        );
      case "audio":
        return (
          <div className="flex h-full w-full items-end justify-center rounded-2xl bg-black p-2">
            <audio className="h-[25px] w-full" controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames(
        "relative w-full cursor-pointer p-3",
        error ? "border-error" : "border-tertiary",
        className
      )}
    >
      <input
        className={
          !!file
            ? "hidden"
            : `absolute left-0 right-0 h-full w-full cursor-pointer opacity-0`
        }
        type="file"
        ref={inputRef}
        accept={accept}
        onChange={(e) => handleInputImage(e.target.files)}
      />

      {renderFile()}

      {!!file &&
        (loading ? (
          <Spinner className="absolute right-0 top-[-18px]" />
        ) : (
          <Button
            variant="icon"
            className="absolute right-0 top-[-18px]"
            onClick={handleClearFile}
          >
            <MdClose width={20} height={20} />
          </Button>
        ))}
    </div>
  );
}
