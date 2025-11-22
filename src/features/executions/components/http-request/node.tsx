"use client"

import { HttpRequestMethod } from "@/config/constants"
import {
	useNodeId,
	useReactFlow,
	type Node,
	type NodeProps,
} from "@xyflow/react"
import { BaseExecutionNode } from "../base-execution-node"
import { GlobeIcon } from "lucide-react"
import { memo, useState } from "react"
import { NodeStatus } from "@/components/react-flow/node-status-indicator"
import { formSchema, HttpRequestSettingsDialog } from "./dialog"
import z from "zod"

type HttpRequestNodeData = {
	endpoint?: string
	method?: HttpRequestMethod
	body?: string
	[key: string]: unknown
}

type HttpRequestNodeType = Node<HttpRequestNodeData>

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
	const nodeId = useNodeId()
	const { updateNodeData } = useReactFlow()
	const [openSettings, setOpenSettings] = useState(false)
	const nodeData = props.data
	const description = nodeData?.endpoint
		? `${nodeData?.method || HttpRequestMethod.GET}: ${nodeData?.endpoint}`
		: "Not configured"
	const status: NodeStatus = "loading"

	const handleSettings = () => setOpenSettings(true)

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		if (!nodeId) return
		updateNodeData(nodeId, values)
	}

	return (
		<>
			<HttpRequestSettingsDialog
				open={openSettings}
				onOpenChange={setOpenSettings}
				onSubmit={handleSubmit}
				defaultValues={nodeData}
			/>
			<BaseExecutionNode
				{...props}
				id={props.id}
				icon={GlobeIcon}
				name="HTTP Request"
				description={description}
				status={status}
				onSettings={handleSettings}
				onDoubleClick={handleSettings}
			/>
		</>
	)
})

HttpRequestNode.displayName = "HttpRequestNode"
