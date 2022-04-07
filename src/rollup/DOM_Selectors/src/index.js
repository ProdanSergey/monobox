const { populateUserData } = require("./app/populate-user-data");
const { countTags } = require("./app/tag-crawler");

populateUserData(document.getElementsByTagName("span"), ".user-list");

countTags(document.body, document.querySelector(".tag-list"));
