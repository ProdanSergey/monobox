import { FunctionComponent } from "react";
import { TrelloList } from "../../domain";

type TrelloBoardListProps = {
  list: TrelloList;
  highlighted: boolean;
  onClick?: (list: TrelloList) => void;
};

export const TrelloBoardList: FunctionComponent<TrelloBoardListProps> = ({ list, highlighted, onClick }) => {
  return <button onClick={() => onClick?.(list)}>{highlighted ? <b>{list.name}</b> : list.name}</button>;
};
