import React, { useState } from "react";
import {
  Plus,
  LayoutTemplate,
  RotateCcw,
  Code,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopBarProps {
  onAddNode: (type: "input" | "transform" | "output") => void;
  onAutoLayout: () => void;
  onReset: () => void;
  validation: { isValid: boolean; errors: string[] };
  onToggleJsonPreview: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  onAddNode,
  onAutoLayout,
  onReset,
  validation,
  onToggleJsonPreview,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          DAG <span className="text-2xl font-bold text-blue-700">Builder</span>
        </h1>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Node
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuItem
                onClick={() => onAddNode("input")}
                className="hover:bg-gray-50"
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Input Node
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onAddNode("transform")}
                className="hover:bg-gray-50"
              >
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                Transform Node
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onAddNode("output")}
                className="hover:bg-gray-50"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Output Node
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={onAutoLayout}
            variant="outline"
            size="sm"
            className="hover:bg-gray-50"
          >
            <LayoutTemplate className="w-4 h-4 mr-2" />
            Auto Layout
          </Button>

          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {validation.isValid ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Valid DAG</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
              <XCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Invalid DAG</span>
            </div>
          )}
        </div>

        <Button
          onClick={onToggleJsonPreview}
          variant="outline"
          size="sm"
          className="hover:bg-gray-50"
        >
          <Code className="w-4 h-4 mr-2" />
          JSON
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
