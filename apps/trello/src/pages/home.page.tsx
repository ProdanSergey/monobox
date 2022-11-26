import { useState } from "react";
import { TrelloList } from "../domain";
import { trelloNetworkClient } from "../providers/trello.network.client.provider";
import { PostTrelloCard, PostTrelloCardAttachment } from "../commands";
import { TrelloCardAttachmentUpload } from "../components/card";
import { TrelloBoardContainer } from "../containers/board.container";

export const HomePage = () => {
  const [list, setList] = useState<TrelloList>();
  const [attachment, setAttachment] = useState<File>();

  const handleClick = async () => {
    if (!list) {
      alert("Select a list before");
      return;
    }

    const { id } = list;

    const card = await new PostTrelloCard(trelloNetworkClient).execute({
      idList: id,
      name: "From React",
    });

    if (attachment) {
      await new PostTrelloCardAttachment(trelloNetworkClient).execute({
        card,
        name: "React Attachment",
        file: attachment,
      });
    }

    alert("Card Created");
  };

  return (
    <div className="App">
      <TrelloBoardContainer onListSelect={setList} />
      <TrelloCardAttachmentUpload onChange={setAttachment} />
      <button onClick={handleClick}>Create Card</button>
    </div>
  );
};
