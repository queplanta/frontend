import React from "react";
import { createFragmentContainer } from "react-relay";
import VotingButtons from "../../voting/VotingButtons.js";
import { hasPerm } from "../../lib/perms.js";
import fragmentSpec from "./CommonNameItem.query.js";

function CommonNameItem(props) {
  const { commonName, plant, className, showLanguage } = props;
  return (
    <li className={className}>
      {commonName.name}{" "}
      {showLanguage && commonName.language ? `(${commonName.language})` : ""}
      {hasPerm(plant, "edit") && (
        <VotingButtons voting={commonName.voting} parentId={commonName.id} />
      )}
    </li>
  );
}

export default createFragmentContainer(CommonNameItem, fragmentSpec);
