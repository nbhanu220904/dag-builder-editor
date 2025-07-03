
import React from 'react';
import { X, Copy, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface JsonPreviewProps {
  nodes: any[];
  edges: any[];
  validation: { isValid: boolean; errors: string[] };
  onClose: () => void;
}

const JsonPreview: React.FC<JsonPreviewProps> = ({ nodes, edges, validation, onClose }) => {
  const dagData = {
    nodes: nodes.map(node => ({
      id: node.id,
      label: node.data.label,
      type: node.data.nodeType,
      position: node.position
    })),
    edges: edges.map(edge => ({
      id: edge.id,
      source: edge.source,
      target: edge.target
    })),
    metadata: {
      isValid: validation.isValid,
      errors: validation.errors,
      nodeCount: nodes.length,
      edgeCount: edges.length
    }
  };

  const jsonString = JSON.stringify(dagData, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonString);
    toast({
      title: "Copied to clipboard",
      description: "DAG JSON has been copied to your clipboard"
    });
  };

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dag-structure.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "DAG JSON file has been downloaded"
    });
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">JSON Preview</h3>
        <div className="flex items-center gap-2">
          <Button onClick={copyToClipboard} size="sm" variant="outline">
            <Copy className="w-4 h-4" />
          </Button>
          <Button onClick={downloadJson} size="sm" variant="outline">
            <Download className="w-4 h-4" />
          </Button>
          <Button onClick={onClose} size="sm" variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        {!validation.isValid && validation.errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Validation Errors:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {validation.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}
        
        <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap break-words">
          {jsonString}
        </pre>
      </div>
    </div>
  );
};

export default JsonPreview;
