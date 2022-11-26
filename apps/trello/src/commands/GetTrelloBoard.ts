import { TrelloNetworkClient } from "../adapters/trello.network.client";
import { TrelloList } from "../domain";

export type GetTrelloBoardParams = {
  id: string;
};

export class GetTrelloBoardLists {
  constructor(private readonly trelloClient: TrelloNetworkClient) {}

  async execute({ id }: GetTrelloBoardParams) {
    return this.trelloClient.get<TrelloList[]>(`boards/${id}/lists`);
  }
}
