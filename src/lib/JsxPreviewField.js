import React from "react";
import {
  Button,
  Grid,
  Paper,
  Link,
  Typography,
  TextField,
  Tabs,
  Tab,
  withStyles,
} from "@material-ui/core";
import JsxParser from "./JsxParser.js";
import CodeBlock from "./CodeBlock.js";
import { TabPanel, a11yProps } from "../lib/Tabs.js";

function JsxPreviewField(props) {
  const { environment, value, classes, ...otherProps } = props;
  const [tabValue, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        centered
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Código" {...a11yProps(0)} />
        <Tab label="Visualização" {...a11yProps(1)} />
        <Tab label="Ajuda" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <TextField value={value} {...otherProps} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <JsxParser jsx={value} environment={environment} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <h2>Imagens</h2>
        <p>
          Imagens podem ser criadas utilizando o componente <code>Image</code>{" "}
          as propriedades padrões são: <br />
        </p>
        <ul>
          <li>
            <b>id</b> - ID da imagem
          </li>
          <li>
            <b>float</b> - Define se a imagem deve ser alocado do lado{" "}
            <code>right</code> (direito) ou <code>left</code> (esquerdo) do seu
            containêr
          </li>
          <li>
            <b>width</b> - Largura da imagem
          </li>
          <li>
            <b>height</b> - Altura da imagem
          </li>
          <li>
            <b>noCard</b> - Adiciona a imagem dentro de um cartão
          </li>
          <li>
            <b>noDescription</b> - Não mostrar descrição da imagem
          </li>
        </ul>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>
          {
            '<Image id="SW1hZ2U6MTUzMzY5MA==" width="600" height="400" noCard />'
          }
        </CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <JsxParser
          jsx={`<Image id="SW1hZ2U6MTUzMzY5MA==" width="600" height="400" noCard />`}
          environment={environment}
        />

        <h1>HTML</h1>
        <h2>Cabeçalhos</h2>
        <p>
          Elementos de cabeçalho são implementados em seis níveis,{" "}
          <code>&#60;h1&#62;</code>é o mais importante e{" "}
          <code>&#60;h6&#62;</code> é o de menor importância. Um elemento de
          cabeçalho descreve brevemente o tópico da seção em que ele está.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>
          {
            "<h1>Cabeçalho nível 1</h1>\n<h2>Cabeçalho nível 2</h2>\n<h3>Cabeçalho nível 3</h3>\n<h4>Cabeçalho nível 4</h4>\n<h5>Cabeçalho nível 5</h5>\n<h6>Cabeçalho nível 6</h6>"
          }
        </CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <h1>Cabeçalho nível 1</h1>
          <h2>Cabeçalho nível 2</h2>
          <h3>Cabeçalho nível 3</h3>
          <h4>Cabeçalho nível 4</h4>
          <h5>Cabeçalho nível 5</h5>
          <h6>Cabeçalho nível 6</h6>
        </code>
        <h2>Formatação de texto</h2>
        <h4>Itálico</h4>
        <p>
          Para escrever seu texto em <i>itálico</i>, insira o elemento HTML{" "}
          <code>&#60;i&#62;</code>.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>{"<i>Meu texto em itálico</i>"}</CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <i>Meu texto em itálico</i>
        </code>
        <h4>Negrito</h4>
        <p>
          Para escrever seu texto em <b>negrito</b>, insira o elemento HTML{" "}
          <code>&#60;b&#62;</code>.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>{"<b>Meu texto em negrito</b>"}</CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <b>Meu texto em negrito</b>
        </code>
        <h4>Parágrafo</h4>
        <p>
          O elemento HTML &#60;p&#62; representa um parágrafo do texto.
          Parágrafos são elementos em bloco.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>{"<p>Meu parágrafo</p>"}</CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <p>Meu parágrafo</p>
        </code>
        <h2>Listas</h2>
        <p>
          O elemento HTML <code>&#60;ul&#62;</code> representa uma lista de
          itens sem ordem rígida, isto é, uma coleção de itens que não trazem
          uma ordenação numérica e as suas posições, nessa lista, são
          irrelevantes.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>
          {"<ul>\n\t<li>Item</li>\n\t<li>Item</li>\n\t<li>Item</li>\n</ul>"}
        </CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <ul>
            <li>Item</li>
            <li>Item</li>
            <li>Item</li>
          </ul>
        </code>
        <h4>Lista ordenada</h4>
        <p>
          O Elemento HTML <code>&#60;ol&#62;</code> representa uma lista de
          itens ordenados.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>
          {"<ol>\n\t<li>Item</li>\n\t<li>Item</li>\n\t<li>Item</li>\n</ol>"}
        </CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <ol>
            <li>Item</li>
            <li>Item</li>
            <li>Item</li>
          </ol>
        </code>
        <p>
          <b>Para mais detalhes veja a documentação em</b>{" "}
          <a
            href="https://developer.mozilla.org/pt-BR/docs/Web/HTML"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://developer.mozilla.org/pt-BR/docs/Web/HTML
          </a>
        </p>
        <hr />
        <h1>Material UI</h1>
        <h2>Grade</h2>
        <p>
          O layout responsivo da grade do Material Design se adapta ao tamanho e
          orientação da tela, garantindo a consistência entre layout.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>
          {
            "<Grid container spacing={1}>\n\t<Grid item xs={4}>\n\t\tColuna 1\n\t</Grid>\n\t<Grid item xs={4}>\n\t\tColuna 2\n\t</Grid>\n\t<Grid item xs={4}>\n\t\tColuna 3\n\t</Grid>\n</Grid>"
          }
        </CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              Coluna 1
            </Grid>
            <Grid item xs={4}>
              Coluna 2
            </Grid>
            <Grid item xs={4}>
              Coluna 3
            </Grid>
          </Grid>
        </code>
        <h2>Botões Contidos</h2>
        <p>
          Botões Contidos tem alta ênfase, distinguem-se pelo uso de elevação e
          preenchimento. <br />
          Eles contém as principais ações da sua aplicação.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>
          {
            '<Button variant="contained">\n\tDefault\n</Button>\n<Button variant="contained" color="primary">\n\tPrimary\n</Button>\n<Button variant="contained" color="secondary">\n\tSecondary\n</Button>\n<Button variant="contained" color="primary" href="#contained-buttons">\n\tLink\n</Button>'
          }
        </CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <Button variant="contained" className={classes.btnExample}>
            Default
          </Button>
          <Button
            variant="contained"
            className={classes.btnExample}
            color="primary"
          >
            Primary
          </Button>
          <Button
            variant="contained"
            className={classes.btnExample}
            color="secondary"
          >
            Secondary
          </Button>
          <Button
            variant="contained"
            className={classes.btnExample}
            color="primary"
            href="#contained-buttons"
          >
            Link
          </Button>
        </code>
        <h2>Links</h2>
        <p>
          O componente Link permite que você personalize facilmente elementos de
          âncora com suas cores de tema e estilos de tipografia.
        </p>
        <h3>Links simples</h3>
        <p>
          O componente Link é construído sobre o componente{" "}
          <code>Typography</code>. Você pode aproveitar suas propriedades.
        </p>
        <p>O seguinte código mostra em uso:</p>
        <CodeBlock>
          {
            '<Typography>\n\t<Link href="URL_">\n\t\tLink\n\t</Link>\n\t<Link href="URL_" color="inherit">\n\t\tcolor="inherit"\n\t</Link>\n\t<Link href="URL_" variant="body2">\n\t\tvariant="body2"\n\t</Link>\n</Typography>'
          }
        </CodeBlock>
        <p>Aqui está o resultado deste código:</p>
        <code>
          <Typography>
            <Link href="URL_">Link</Link>
            <br />
            <Link href="URL_" color="inherit">
              {'color="inherit"'}
            </Link>
            <br />
            <Link href="URL_" variant="body2">
              {'variant="body2"'}
            </Link>
          </Typography>
        </code>
        <p>
          <b>Para mais detalhes veja a documentação em</b>{" "}
          <a
            href="https://material-ui.com/pt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://material-ui.com/pt/
          </a>
        </p>
      </TabPanel>
    </Paper>
  );
}

const styles = (theme) => ({
  btnExample: {
    marginRight: "20px",
  },
});

export default withStyles(styles)(JsxPreviewField);
