import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface CustomNodeData extends Record<string, unknown> {
  label: string;
  nodeType: "input" | "transform" | "output";
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({
  data,
  selected,
}) => {
  const nodeType = data.nodeType || "transform";

  const getNodeColor = (type: string) => {
    switch (type) {
      case "input":
        return "border-blue-500 bg-blue-50 text-blue-900";
      case "output":
        return "border-green-500 bg-green-50 text-green-900";
      default:
        return "border-yellow-500 bg-yellow-50 text-yellow-900";
    }
  };

  const getNodeIndicator = (type: string) => {
    switch (type) {
      case "input":
        return "bg-blue-500";
      case "output":
        return "bg-green-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 min-w-[120px] transition-all duration-200 ${getNodeColor(
        nodeType
      )} ${
        selected ? "ring-2 ring-blue-400 ring-opacity-50" : ""
      } hover:shadow-md`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ left: -6 }}
      />

      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${getNodeIndicator(nodeType)}`}
        ></div>
        <span className="font-medium text-sm">{data.label}</span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white"
        style={{ right: -6 }}
      />
    </div>
  );
};

export default CustomNode;
