import { ChangeEventHandler, FunctionComponent } from "react";

type TrelloCardAttachmentUploadProps = {
  onChange: (image: File) => void;
};

export const TrelloCardAttachmentUpload: FunctionComponent<TrelloCardAttachmentUploadProps> = ({ onChange }) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const image = target?.files?.[0];

    if (image) {
      onChange(image);
    }
  };

  return (
    <div>
      <input type="file" name="image" id="image" onChange={handleChange} />
    </div>
  );
};
