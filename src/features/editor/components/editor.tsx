"use client"

import { useCallback } from "react"
import {
	ReactFlow,
	addEdge,
	type Connection,
	Background,
	Controls,
	MiniMap,
	Panel,
	useNodesState,
	useEdgesState,
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
	const [nodes, , onNodesChange] = useNodesState(workflow.nodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(workflow.edges)

	const onConnect = useCallback(
		(params: Connection) =>
			setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
		[setEdges]
	)

	return (
		<div className="size-full">
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
				snapGrid={[10, 10]}
				snapToGrid
				panOnScroll
				panOnDrag={false}
				selectionOnDrag
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
