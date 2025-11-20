"use client"

import { useState, useCallback } from "react"
import {
	ReactFlow,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	type Node,
	type Edge,
	type NodeChange,
	type EdgeChange,
	type Connection,
	Background,
	Controls,
	MiniMap,
	Panel,
} from "@xyflow/react"
import { EntityStateView } from "@/components/entity-components"
import { Spinner } from "@/components/ui/spinner"
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows"
import { AlertTriangleIcon } from "lucide-react"
import "@xyflow/react/dist/style.css"
import { nodeComponents } from "@/config/node-components"
import { AddNodeBtn } from "./add-node-btn"

export const EditorLoading = () => {
	return (
		<EntityStateView
			icon={<Spinner className="size-6" />}
			title="Loading workflow..."
		/>
	)
}

export const EditorError = () => {
	return (
		<EntityStateView
			icon={<AlertTriangleIcon className="size-6 text-orange-600" />}
			title="Error loading workflow"
		/>
	)
}

export const Editor = ({ workflowId }: { workflowId: string }) => {
	const { data: workflow } = useSuspenseWorkflow(workflowId)
	const [nodes, setNodes] = useState<Node[]>(workflow.nodes)
	const [edges, setEdges] = useState<Edge[]>(workflow.edges)

	const onNodesChange = useCallback(
		(changes: NodeChange[]) =>
			setNodes((nodesSnapshot) =>
				applyNodeChanges(changes, nodesSnapshot)
			),
		[]
	)
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) =>
			setEdges((edgesSnapshot) =>
				applyEdgeChanges(changes, edgesSnapshot)
			),
		[]
	)
	const onConnect = useCallback(
		(params: Connection) =>
			setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[]
	)

	return (
		<div style={{ width: "100%", height: "100%" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
				nodeTypes={nodeComponents}
				proOptions={{
					hideAttribution: true,
				}}
			>
				<Background />
				<Controls />
				<MiniMap />
				<Panel position="top-right">
					<AddNodeBtn />
				</Panel>
			</ReactFlow>
		</div>
	)
}
