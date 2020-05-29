import React from "react";
import { Table, Link, withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet";
import ProfileLink from "../accounts/ProfileLink.js";
import { RelativeDate } from "../ui";

function RevisionList(props) {
  const { node } = props;

  if (node.__typename === "Post") {
    var title = node.title;
  } else if (node.__typename === "Page") {
    var title = node.title;
  } else if (node.__typename === "Comment") {
    var title = "Comentário " + node.id;
  } else if (node.__typename === "LifeNode") {
    var title = "Vida " + node.title;
  } else {
    var title = node.__typename + " " + node.id;
  }

  return (
    <div className="col-xs-12">
      <Helmet
        title={`Historico de alterações: ${title}`}
        meta={[{ name: "robots", content: "noindex, nofollow" }]}
      />
      <h1>{`Historico de alterações: ${title}`}</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>Indice</th>
            <th>Autor</th>
            <th>Quando</th>
            <th>Tipo</th>
            <th>Mensagem</th>
          </tr>
        </thead>
        <tbody>
          {node.revisions.edges.map(function (edge, i) {
            var revision = edge.node;

            var current;
            if (revision.isTip) {
              current = (
                <span className="label label-success">
                  <i className="fa fa-check" aria-hidden="true"></i> atual
                </span>
              );
            }

            return (
              <tr key={i}>
                <td>
                  {revision.index}ª:{" "}
                  <Link to={`/revisions/revision/${revision.id}`}>
                    {revision.idInt}
                  </Link>{" "}
                  {current}
                </td>
                <td>
                  <ProfileLink user={revision.author} />
                </td>
                <td>
                  <RelativeDate date={revision.createdAt} />
                </td>
                <td>{revision.typeDisplay}</td>
                <td>
                  <Link to={`/revisions/revision/${revision.id}`}>
                    {revision.message}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

const styles = (theme) => ({
  wrapBtn: {
    padding: theme.spacing(2),
  },
  actionRoot: {
    right: theme.spacing(2),
  },
});

export default withStyles(styles)(RevisionList);
