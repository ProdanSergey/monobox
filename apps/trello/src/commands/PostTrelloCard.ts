import { TrelloNetworkClient } from "../adapters/trello.network.client";
import { TrelloCard } from "../domain";

export type PostTrelloCardParams = {
  idList: string;
  name: string;
  desc?: string;
};

export class PostTrelloCard {
  constructor(private readonly trelloClient: TrelloNetworkClient) {}

  async execute({ idList, name }: PostTrelloCardParams) {
    return this.trelloClient.post<TrelloCard>("cards", {
      query: { idList, name },
    });
  }
}
