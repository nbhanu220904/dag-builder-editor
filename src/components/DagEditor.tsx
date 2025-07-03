import React, { useState, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TopBar from "./TopBar";
import JsonPreview from "./JsonPreview";
import CustomNode from "./CustomNode";
import SideBar from "./SideBar"; // ✅ Import Sidebar

import { validateDAG, getAutoLayout } from "@/utils/dagUtils";
import { toast } from "@/hooks/use-toast";

const nodeTypes = {
  custom: CustomNode,
};

const DagEditorContent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isJsonPreviewOpen, setIsJsonPreviewOpen] = useState(false);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const reactFlowInstance = useReactFlow();

  const validation = validateDAG(nodes, edges);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const newEdge = { ...params, id: `e${params.source}-${params.target}` };
      const tempEdges = [...edges, newEdge];
      const tempValidation = validateDAG(nodes, tempEdges);

      if (
        !tempValidation.isValid &&
        tempValidation.errors.some((e) => e.includes("cycle"))
      ) {
        toast({
          title: "Invalid Connection",
          description: "This connection would create a cycle in the DAG",
          variant: "destructive",
        });
        return;
      }

      setEdges((eds) => addEdge(params, eds));
    },
    [edges, nodes, setEdges]
  );

  const addNode = useCallback(
    (type: "input" | "transform" | "output" = "transform") => {
      const newNode = {
        id: `node-${nodeIdCounter}`,
        type: "custom",
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
        data: {
          label: `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } ${nodeIdCounter}`,
          nodeType: type,
        },
      };
      setNodes((nds) => [...nds, newNode]);
      setNodeIdCounter((prev) => prev + 1);
    },
    [nodeIdCounter, setNodes]
  );

  const resetGraph = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setNodeIdCounter(1);
  }, [setNodes, setEdges]);

  const autoLayout = useCallback(() => {
    if (!nodes.length) return;

    const layouted = getAutoLayout(nodes, edges);
    setNodes(layouted.nodes);
    setEdges(layouted.edges);

    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.2 });
    }, 0);
  }, [nodes, edges, setNodes, setEdges, reactFlowInstance]);

  const onNodesDelete = useCallback(
    (nodesToDelete: any[]) => {
      const nodeIds = nodesToDelete.map((n) => n.id);
      setEdges((eds) =>
        eds.filter(
          (e) => !nodeIds.includes(e.source) && !nodeIds.includes(e.target)
        )
      );
    },
    [setEdges]
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopBar
        onAddNode={addNode}
        onAutoLayout={autoLayout}
        onReset={resetGraph}
        validation={validation}
        onToggleJsonPreview={() => setIsJsonPreviewOpen((prev) => !prev)}
      />

      <div className="flex flex-1 overflow-hidden">
        <SideBar
          isJsonOpen={isJsonPreviewOpen}
          onToggleJson={() => setIsJsonPreviewOpen((prev) => !prev)}
          onAddNode={addNode}
        />

        <div className="relative flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesDelete={onNodesDelete}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
            connectionLineStyle={{ stroke: "#94a3b8", strokeWidth: 2 }}
            defaultEdgeOptions={{
              style: { stroke: "#64748b", strokeWidth: 2 },
              markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
            }}
          >
            <div className="absolute bottom-4 left-4 z-10 flex gap-2">
              <button
                onClick={() => reactFlowInstance.zoomIn()}
                className="bg-white px-3 py-2 rounded-lg shadow-sm border hover:bg-gray-50 transition-colors"
              >
                +
              </button>
              <button
                onClick={() => reactFlowInstance.zoomOut()}
                className="bg-white px-3 py-2 rounded-lg shadow-sm border hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <button
                onClick={() => reactFlowInstance.fitView({ padding: 0.2 })}
                className="bg-white px-3 py-2 rounded-lg shadow-sm border hover:bg-gray-50 transition-colors text-sm"
              >
                Fit
              </button>
            </div>
          </ReactFlow>
        </div>

        {isJsonPreviewOpen && (
          <JsonPreview
            nodes={nodes}
            edges={edges}
            validation={validation}
            onClose={() => setIsJsonPreviewOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

const DagEditor = () => (
  <ReactFlowProvider>
    <DagEditorContent />
  </ReactFlowProvider>
);

export default DagEditor;
