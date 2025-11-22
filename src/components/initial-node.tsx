"use client"

import { NodeProps } from "@xyflow/react"
import { PlaceholderNode } from "./react-flow/placeholder-node"
import { PlusIcon } from "lucide-react"
import { WorkflowNode } from "./workflow-node"
import { NodeSelector } from "./node-selector"
import { memo } from "react"

export const InitialNode = memo((props: NodeProps) => {
	return (
		<WorkflowNode showToolbar={false}>
			<NodeSelector>
				<PlaceholderNode {...props}>
					<div className="cursor-pointer flex items-center justify-center">
						<PlusIcon className="size-4" />
					</div>
				</PlaceholderNode>
			</NodeSelector>
		</WorkflowNode>
	)
})

InitialNode.displayName = "InitialNode"
