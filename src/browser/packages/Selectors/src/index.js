import { populateUserData } from "./app/populate-user-data";
import { countTags } from "./app/tag-crawler";

populateUserData(document.getElementsByTagName("span"), ".user-list");

countTags(document.body, document.querySelector(".tag-list"));
