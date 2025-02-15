import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { Root } from "mdast";

type Link = {
  url: string;
  tag: string;
};
type TableRow = Record<string, string | Link>;
type TableData = TableRow[];

interface TableNode {
  type: "table";
  children: TableRowNode[];
}

interface TableRowNode {
  type: "tableRow";
  children: TableCellNode[];
}

interface TableCellNode {
  type: "tableCell";
  children: TableTextNode[];
}

interface TableTextNode {
  type: "text";
  value: string;
  url?: string;
  children?: TableTextNode[];
}

const refColumns = ["Name", "Level", "Stack", "Last", "Next"];

function checkTableColumns(ref: string[], comp: string[]) {
  if (ref.length !== comp.length) {
    return false;
  }
  for (const idx in ref) {
    if (ref[idx] !== comp[idx]) {
      return false;
    }
  }
  return true;
}

function ast(data: string) {
  return unified().use(remarkParse).use(remarkGfm).parse(data);
}

function td(cell: TableCellNode, columnName: string): string | Link {
  if (columnName.toLowerCase() === "name") {
    if (cell?.children.length > 0) {
      const link = cell.children[0];
      const url = link.url || "";
      const tag = link.children ? link.children[0].value : "";
      return {
        url,
        tag,
      };
    } else {
      return "";
    }
  } else {
    if (cell?.children.length > 0) {
      const text = cell.children[0].value;
      return text;
    }
    return "";
  }
}

function traverse(root: Root): TableData[] {
  const tableData: TableData[] = [];
  root.children.forEach((child) => {
    if (child.type === "table") {
      const tableNode = child as TableNode;
      if (tableNode.children.length > 1) {
        const columns: string[] = tableNode.children[0].children.map(
          (cell) => (cell.children[0] as TableTextNode)?.value || ""
        );
        if (!checkTableColumns(refColumns, columns)) {
          return;
        }
        const rows: TableRow[] = tableNode.children
          .slice(1)
          .map((row) =>
            Object.fromEntries(
              row.children.map((cell, i) => [columns[i], td(cell, columns[i])])
            )
          );
        tableData.push(rows);
      }
    }
  });
  return tableData;
}

export default function getData() {
  fetch("https://raw.githubusercontent.com/nera1/CCT/refs/heads/main/README.md")
    .then((result) => result.text())
    .then((data) => {
      const tree = ast(data);
      const tables = traverse(tree);
      console.log(tables);
    });
}
