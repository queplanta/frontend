import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Link,
  Paper,
  Popper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import MessageIcon from "@material-ui/icons/Message";
import { Helmet } from "react-helmet";
import PageTitle from "../lib/PageTitle.js";
import { Link as RouterLink } from "found";
import ProfileLink from "../accounts/ProfileLink.js";
import { RelativeDate, Width } from "../ui";

function RevisionList(props) {
  const { classes, node } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const handleClick = (openState, message) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(openState);
    setMessage(message);
  };

  var title;

  if (node.__typename === "Post") {
    title = node.title;
  } else if (node.__typename === "Page") {
    title = node.title;
  } else if (node.__typename === "Comment") {
    title = "Comentário " + node.id;
  } else if (node.__typename === "LifeNode") {
    title = "Planta " + node.title;
  } else {
    title = node.__typename + " " + node.id;
  }

  return (
    <Width>
      <Helmet
        title={`Historico de alterações: ${title}`}
        meta={[{ name: "robots", content: "noindex, nofollow" }]}
      />
      <PageTitle>{`Historico de alterações: ${title}`}</PageTitle>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="top"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent",
          },
          arrow: {
            enabled: true,
          },
        }}
      >
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2" component="p">
              {message}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleClick(false)}>
              Fechar
            </Button>
          </CardActions>
        </Card>
      </Popper>
      <Paper>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Indice</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Quando</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {node.revisions &&
              node.revisions.edges.map(function (edge, i) {
                var revision = edge.node;

                var current;
                if (revision.isTip) {
                  current = (
                    <Chip
                      icon={<DoneIcon />}
                      label="Atual"
                      size="small"
                      className={classes.isCurrent}
                    />
                  );
                }

                return (
                  <TableRow key={i}>
                    <TableCell>
                      {revision.index}ª:{" "}
                      <Link
                        to={`/revisions/revision/${revision.id}`}
                        component={RouterLink}
                      >
                        {revision.idInt}
                      </Link>{" "}
                      {current}
                    </TableCell>
                    <TableCell>
                      <ProfileLink user={revision.author} />
                    </TableCell>
                    <TableCell>
                      <RelativeDate date={revision.createdAt} />
                    </TableCell>
                    <TableCell>{revision.typeDisplay}</TableCell>
                    <TableCell>
                      {revision.message && (
                        <Tooltip title="Mensagem" placement="top">
                          <IconButton
                            color="primary"
                            onClick={handleClick(true, `${revision.message}`)}
                          >
                            <MessageIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </Width>
  );
}

const styles = (theme) => ({
  wrapBtn: {
    padding: theme.spacing(2),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
  isCurrent: {
    background: "#4caf50",
    color: "#FFF",
  },
});

export default withStyles(styles)(RevisionList);
