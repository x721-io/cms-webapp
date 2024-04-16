import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  TINYMCE_API_KEY,
  TINYMCE_PLUGINS,
  TINYMCE_TOOLBAR,
} from "../../../../config/contanst";
import { useMarketplaceApi } from "../../../../hooks/useMarketplaceApi";
import useAuthStore from "../../../../store/auth/store";

interface FormData {
  title: string;
  // content: EditorState;
}

type Upload = (
  blobInfo: { blob: () => Blob; filename: () => string },
  success: (url: string) => void,
  failure: () => void,
  progress: (percent: number) => void
) => void;

export default function CreateBlog() {
  const api = useMarketplaceApi();

  const { setCredentials, credentials } = useAuthStore();

  const bearerToken = credentials && credentials.accessToken;

  const { register, handleSubmit } = useForm<FormData>();

  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };

  const handleUpload = async (
    file: Blob,
    success: (url: string) => void,
    failure: () => void
  ) => {
    const uploadToast = toast.loading("Uploading Image...");
    try {
      const imageFile = new FormData();
      imageFile.append("files[]", file);

      const response = await api.uploadFile(file);
      toast.update(uploadToast, {
        render: "upload successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      // const url = response.data.fileURL;
      // success(url);
    } catch (e: any) {
      console.error(e);
      toast.update(uploadToast, {
        render: (error) => `Error report: ${e.message}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
      failure();
    }
  };

  const handleImageUpload: Upload = (blobInfo, success, failure, progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8000/server.php", true);

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
        if (progress && typeof progress === "function") {
          const percent = 0;
          progress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.location);
      };

      xhr.onerror = () => {
        reject({ message: "Image upload failed", remove: true });
        if (failure && typeof failure === "function") {
          failure();
        }
      };

      xhr.send(formData);
    });

  return (
    <div className="w-full">
      <h2>Create Blog Post</h2>
      <form className="w-full">
        <div>
          <label>Title</label>
          <input type="text" name="title" />
        </div>
        <div className=" w-full">
          <label>Content</label>
          <Editor
            apiKey={TINYMCE_API_KEY}
            // initialValue="<p>This is the initial content of the editor</p>"
            init={{
              skin: "snow",
              icons: "thin",
              placeholder: "Ask a question or post an update...",
              plugins: TINYMCE_PLUGINS,
              paste_as_text: true,
              height: 500,
              menubar: true,
              text_color_rows: "4",
              toolbar: TINYMCE_TOOLBAR,
              mobile: {
                toolbar_drawer: "floating",
              },
              images_upload_url: "http://localhost:8000/server.php",
              automatic_uploads: true,
              images_reuse_filename: true,
              // images_upload_handler: function (blobInfo, success, failure) {
              //   let data = new FormData();
              //   data.append('file', blobInfo.blob(), blobInfo.filename());
              //   axios.post('/file-upload', data)
              //     .then(function (res) {
              //       success(res.data.location);
              //     })
              //     .catch(function (err) {
              //       failure('HTTP Error: ' + err.message);
              //     });
              // }
            }}
            onEditorChange={handleEditorChange} // toolbar="code"
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
