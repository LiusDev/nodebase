import type {
	Node as ServerNode,
	Connection as ServerConnection,
} from "@/generated/prisma/client"
import type {
	Node as ReactFlowNode,
	Edge as ReactFlowEdge,
	XYPosition,
} from "@xyflow/react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const serverNodeToReactFlowNode = (node: ServerNode): ReactFlowNode => ({
	id: node.id,
	type: node.type,
	position: node.position as XYPosition,
	data: (node.data as Record<string, unknown>) || {},
})

export const serverConnectionToReactFlowEdge = (
	connection: ServerConnection
): ReactFlowEdge => ({
	id: connection.id,
	source: connection.fromNodeId,
	target: connection.toNodeId,
	sourceHandle: connection.fromOutput,
	targetHandle: connection.toInput,
})
