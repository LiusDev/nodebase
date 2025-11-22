"use client"

import {
	Position,
	useNodeId,
	useReactFlow,
	type NodeProps,
} from "@xyflow/react"
import { type LucideIcon } from "lucide-react"
import { WorkflowNode } from "@/components/workflow-node"
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node"
import Image from "next/image"
import { BaseHandle } from "@/components/react-flow/base-handle"
import { memo, useCallback } from "react"
import {
	NodeStatus,
	NodeStatusIndicator,
} from "@/components/react-flow/node-status-indicator"

interface BaseTriggerNodeProps extends NodeProps {
	icon: LucideIcon | string
	name: string
	description?: string
	status?: NodeStatus
	children?: React.ReactNode
	onSettings?: () => void
	onDoubleClick?: () => void
}

export const BaseTriggerNode = memo(
	({
		icon: Icon,
		name,
		description,
		status = "initial",
		children,
		onSettings,
		onDoubleClick,
	}: BaseTriggerNodeProps) => {
		const nodeId = useNodeId()
		const { setNodes, setEdges } = useReactFlow()

		const handleDelete = useCallback(() => {
			setNodes((nodes) => nodes.filter((node) => node.id !== nodeId))
			setEdges((edges) =>
				edges.filter(
					(edge) => edge.source !== nodeId && edge.target !== nodeId
				)
			)
		}, [nodeId, setNodes, setEdges])

		return (
			<WorkflowNode
				name={name}
				description={description}
				onSettings={onSettings}
				onDelete={handleDelete}
			>
				<NodeStatusIndicator status={status} className="rounded-l-2xl">
					<BaseNode
						className="rounded-l-2xl relative group"
						status={status}
						onDoubleClick={onDoubleClick}
					>
						<BaseNodeContent>
							{typeof Icon === "string" ? (
								<Image
									src={Icon}
									alt={name}
									width={16}
									height={16}
								/>
							) : (
								<Icon className="size-4 text-muted-foreground" />
							)}
							{children}
							<BaseHandle
								id="source-1"
								type="source"
								position={Position.Right}
							/>
						</BaseNodeContent>
					</BaseNode>
				</NodeStatusIndicator>
			</WorkflowNode>
		)
	}
)

BaseTriggerNode.displayName = "BaseTriggerNode"
