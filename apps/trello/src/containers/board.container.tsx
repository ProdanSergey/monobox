import { FunctionComponent, useState, useEffect } from "react";
import { TrelloList } from "../domain";
import { GetTrelloBoardLists } from "../commands";
import { trelloNetworkClient } from "../providers/trello.network.client.provider";
import { TrelloBoard } from "../components/board";

type BoardListsProps = {
  onListSelect?: (list: TrelloList) => void;
};

export const TrelloBoardContainer: FunctionComponent<BoardListsProps> = ({ onListSelect }) => {
  const [selected, setSelected] = useState<TrelloList>();
  const [lists, setLists] = useState<TrelloList[]>([]);

  const handleSelect = (list: TrelloList) => {
    setSelected(list);
    onListSelect?.(list);
  };

  useEffect(() => {
    const boardId = "nbp0r7xs";

    const request = async () => {
      const lists = await new GetTrelloBoardLists(trelloNetworkClient).execute({ id: boardId });

      setLists(lists);
    };

    request();
  }, []);

  return <TrelloBoard lists={lists} selected={selected} onSelect={handleSelect} />;
};
