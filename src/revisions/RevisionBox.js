import React from "react";
import {
  Typography,
  Divider,
  Link,
  Badge,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import ProfileLink from "../accounts/ProfileLink.js";
import { Link as RouterLink } from "found";
import { RelativeDate } from "../ui";
import fragmentSpec from "./RevisionBox.query.js";
import { createFragmentContainer } from "react-relay";

function RevisionBox(props) {
  const { classes, children, document: node, objectId } = props;

  return (
    <div>
      <Typography color="textPrimary" display="block" variant="caption">
        {node.revisionCreated.author ? (
          <span>
            Cadastrado por{" "}
            <ProfileLink user={node.revisionCreated.author} hideAvatar={true} />
          </span>
        ) : (
          `Cadastrado`
        )}
      </Typography>
      <Typography color="textSecondary" display="block" variant="caption">
        <RelativeDate date={node.revisionCreated.createdAt} />
      </Typography>
      <Typography color="textPrimary" display="block" variant="caption">
        {node.revisionTip.author ? (
          <span>
            Última alteração por{" "}
            <ProfileLink user={node.revisionTip.author} hideAvatar={true} />
          </span>
        ) : (
          `Última alteração`
        )}
      </Typography>
      <Typography color="textSecondary" display="block" variant="caption">
        <RelativeDate date={node.revisionTip.createdAt} />
      </Typography>
      <Divider variant="fullWidth" className={classes.dividerMargin} />
      <Typography color="textPrimary" display="block" variant="caption">
        <Badge
          classes={{ badge: classes.margin }}
          badgeContent={node.revisionsCount}
          max={999}
          color="primary"
        >
          <Link
            to={`/revisions/${objectId}`}
            className={classes.padding}
            component={RouterLink}
          >
            Historico de alterações{" "}
          </Link>
        </Badge>
      </Typography>
      {children}
    </div>
  );
}

const styles = (theme) => ({
  dividerMargin: {
    margin: theme.spacing(1, 0),
  },
  margin: {
    marginTop: theme.spacing(1),
  },
  padding: {
    paddingRight: theme.spacing(2),
  },
});

export default createFragmentContainer(
  withStyles(styles)(RevisionBox),
  fragmentSpec
);

RevisionBox.propTypes = {
  document: PropTypes.object.isRequired,
  objectId: PropTypes.string.isRequired,
};
