import { FunctionComponent } from "react";
import ordinal from "ordinal";
import { Problem as ProblemType } from "@/util/sortData";

interface ProblemComponent extends ProblemType {
  ghost?: boolean;
}

interface LevelAttribute {
  levelString: string;
  ghost: {
    color: string;
  };
  default: {
    bg: string;
    color: string;
  };
}

function generateLevel(level: string): LevelAttribute {
  const result: LevelAttribute = {
    levelString: "",
    ghost: {
      color: "",
    },
    default: {
      bg: "",
      color: "",
    },
  };
  const levelString = level.slice(0, -1).trim().toLowerCase();
  const levelNumber = level.slice(-1);

  switch (levelString) {
    case "level":
      {
        result.levelString = `Level ${levelNumber}`;
        switch (Number(levelNumber)) {
          case 1:
            {
              result.ghost.color = "#1bbaff";
              result.default.bg = "#1bbaff";
              result.default.color = "#ffffff";
            }
            break;
          case 2:
            {
              result.ghost.color = "#47c84c";
              result.default.bg = "#47c84c";
              result.default.color = "#ffffff";
            }
            break;
          case 3:
            {
              result.ghost.color = "#ffa800";
              result.default.bg = "#ffa800";
              result.default.color = "#ffffff";
            }
            break;
          case 4:
            {
              result.ghost.color = "#ff6b18";
              result.default.bg = "#ff6b18";
              result.default.color = "#ffffff";
            }
            break;
          case 5:
            {
              result.ghost.color = "#c658e1";
              result.default.bg = "#c658e1";
              result.default.color = "#ffffff";
            }
            break;
          default:
            break;
        }
      }
      break;
    default:
      {
        switch (levelString) {
          case "b":
            {
              result.levelString = "Bronze";
              result.ghost.color = "#ad5600";
              result.default.bg =
                "linear-gradient(to bottom, #CD7F32 0%, #BE7023 100%)";
            }
            break;
          case "s":
            {
              result.levelString = "Silver";
              result.ghost.color = "#435f7a";
              result.default.bg = "linear-gradient(135deg, #435f7a, #a9a9a9)";
            }
            break;
          case "g":
            {
              result.levelString = "Gold";
              result.ghost.color = "#ec9a00";
              result.default.bg = "linear-gradient(135deg, #CC9934, #1E1D1B)";
            }
            break;
          case "p":
            {
              result.levelString = "Platinum";
              result.ghost.color = "#27e2a4";
              result.default.bg = "linear-gradient(45deg, #00706c, #00ffbb)";
            }
            break;
          case "d":
            {
              result.levelString = "Diamond";
              result.ghost.color = "#00b4fc";
              result.default.bg = "linear-gradient(135deg, #00D0FF, #86E9FF)";
            }
            break;
          default:
            break;
        }
        result.levelString = `${result.levelString} ${levelNumber}`;
      }
      break;
  }

  return result;
}

const Problem: FunctionComponent<ProblemComponent> = (props) => {
  const {
    Name: { url, tag },
    Level,
    Last,
    Stack,
    Next,
    Related,
    ghost = false,
  } = props;
  const stack = Stack.split("");
  const attributes: LevelAttribute = generateLevel(Level);
  return (
    <li
      className={`flex flex-col items-start gap-2 rounded-lg border p-5 text-left text-sm transition-all hover:bg-accent`}
      style={{
        borderColor: attributes.ghost.color,
        background: ghost ? "transparent" : attributes.default.bg,
        outlineColor: "none",
        overflow: "hidden",
      }}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className="font-semibold"
              style={{
                color: ghost
                  ? attributes.ghost.color
                  : attributes.default.color,
              }}
            >{`${attributes.levelString}`}</div>
          </div>
          <div
            className="ml-auto text-xs text-muted-foreground"
            style={{ color: ghost ? undefined : "#f5f5f5" }}
          >
            {Next || Last}
          </div>
        </div>
        <div
          className="text-xs font-medium"
          style={{ color: ghost ? "#a3a3a3" : "#f5f5f5" }}
        >{`${ordinal(stack.length)} attempt`}</div>
      </div>
      <a className="text-2xl font-bold" href={url} target="_blank">
        {tag}
      </a>
      <div className="tracking-tight text-sm font-normal flex gap-x-1 text-neutral-200">
        {Related.length > 0 ? "Related: " : ""}
        {Related.length > 0 ? (
          Related.map((item, idx) => (
            <a
              className="hover:underline after:content-[','] last:after:content-['']"
              href={item.url}
              key={item.url + "_" + idx}
            >
              {item.tag}
            </a>
          ))
        ) : (
          <></>
        )}
      </div>
    </li>
  );
};

export default Problem;
