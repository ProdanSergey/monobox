import { TrelloNetworkClient } from "../adapters/trello.network.client";
import { TrelloCard } from "../domain";

export type PostTrelloCardAttachmentParams = {
  card: TrelloCard;
  name: string;
  file: File;
};

export class PostTrelloCardAttachment {
  constructor(private readonly trelloClient: TrelloNetworkClient) {}

  async execute({ card, name, file }: PostTrelloCardAttachmentParams) {
    const formData = new FormData();
    formData.append("file", file);

    this.trelloClient.upload(`cards/${card.id}/attachments`, formData, {
      query: { name },
    });
  }
}
