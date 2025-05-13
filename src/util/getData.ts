import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";

type Link = {
  url: string;
  tag: string;
};
type TableRow = Record<string, string | Link | Link[]>;
type TableData = TableRow[];

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

interface TableNode {
  type: "table";
  children: TableRowNode[];
}

interface TableRowNode {
  type: "tableRow";
  children: TableCellNode[];
}

const refColumns = ["Name", "Level", "Stack", "Last", "Next", "Related"];

function checkTableColumns(ref: string[], comp: string[]) {
  if (ref.length !== comp.length) return false;
  return ref.every((col, idx) => col === comp[idx].trim());
}

function ast(data: string) {
  return unified().use(remarkParse).use(remarkGfm).parse(data);
}

export function td(
  cell: TableCellNode,
  columnName: string
): string | Link | Link[] {
  if (columnName === "Name") {
    const node = cell.children[0];
    if (node?.url) {
      return { url: node.url, tag: node.children?.[0]?.value ?? "" };
    }
    return "";
  }

  if (columnName === "Related") {
    return cell.children
      .filter((child) => !!child.url)
      .map((linkNode) => ({
        url: linkNode.url!,
        tag: linkNode.children?.[0]?.value ?? "",
      }));
  }

  return cell.children[0]?.value ?? "";
}

export default function getData() {
  return fetch("https://raw.githubusercontent.com/nera1/CCT/main/README.md")
    .then((r) => r.text())
    .then((data) => {
      const tree = ast(data);
      const tableData: TableData[] = [];

      tree.children.forEach((child) => {
        if (child.type !== "table") return;
        const table = child as TableNode;
        if (table.children.length < 2) return;

        const rawHeaders = table.children[0].children.map(
          (cell) => (cell.children[0] as TableTextNode).value
        );
        if (!checkTableColumns(refColumns, rawHeaders)) return;

        const rows: TableRow[] = table.children
          .slice(1)
          .map((row) =>
            Object.fromEntries(
              row.children.map((cell, i) => [
                refColumns[i],
                td(cell, refColumns[i]),
              ])
            )
          );

        tableData.push(rows);
      });
      return tableData;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
}
