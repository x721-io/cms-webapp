"use client";

import { Spinner } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import CloseIcon from "../../assets/svg/Close";
import { useFormHelper } from "../../hooks/useHelper";
import { classNames } from "../../utils/string";
import Text from "../Text";
import Button from "../Button/CustomButton";
import { FormMessageValidate } from "./FormMessageValidate";


interface Props<T> {
  className?: string;
  value?: string | Blob;
  onInput?: (file: Blob | undefined) => void;
  loading?: boolean;
  error?: boolean;
  accept?: string;
  maxSize?: number;
  mainForm: UseFormReturn<T extends FieldValues ? T : FieldValues>;
  fieldName: Path<T extends FieldValues ? T : FieldValues>;
}

const ImageUploader = <T extends FieldValues>(props: Props<T>) => {
  const {
    mainForm,
    fieldName,
    className,
    value,
    onInput,
    loading,
    accept,
    maxSize = 100, // 100 MB
  } = props;
  const { onValidateForm } = useFormHelper();
  const dataValidate = onValidateForm({ mainForm, fieldName });

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

  const colorClass = useMemo(() => {
    switch (dataValidate) {
      case "is-valid":
        return "text-green-500 ring-green-500";
      case "is-invalid":
        return "text-red-600 border-red-600 border-[0.5px]";
      default:
        return "text-primary focus-visible:ring-primary border-gray-300 border";
    }
  }, [dataValidate]);

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
        <div className="mb-4 flex h-full w-full flex-col items-center justify-center gap-6">
          <Text
            className="text-secondary text-center font-semibold"
            variant="body-24"
          >
            <span className="uppercase">{accept?.split(",").join(", ")}</span>{" "}
            Max {maxSize}mb.
          </Text>
          <Button className='bg-white' variant="primary">Choose File</Button>
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
            // className="m-auto h-full w-auto rounded-2xl object-contain"
            className={classNames(
              "m-auto h-full w-auto rounded-2xl object-contain",
              className,
              onValidateForm({ mainForm, fieldName }) === "is-invalid" &&
                colorClass
            )}
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

  useEffect(() => {
    if (typeof value === "string" && value !== "") {
      fetch(value)
        .then((res) => res.blob())
        .then((blob) => setFile(blob))
        .catch((error) => console.error("Error loading image:", error));
    } else {
      setFile(undefined);
    }
  }, [value]);

  return (
    <div
      className={classNames(
        "relative h-60 w-full cursor-pointer rounded-2xl border border-dashed border-gray-500 p-3",
        onValidateForm({ mainForm, fieldName }) === "is-invalid" && colorClass,
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
      <FormMessageValidate mainForm={mainForm} fieldName={fieldName} />

      {!!file &&
        (loading ? (
          <Spinner className="absolute right-0 top-[-18px]" />
        ) : (
          <Button
            variant="icon"
            className="absolute right-0 top-[-18px] rounded-md bg-gray-200"
            onClick={handleClearFile}
          >
            <CloseIcon width={20} height={20} />
          </Button>
        ))}
    </div>
  );
};

export default ImageUploader;
