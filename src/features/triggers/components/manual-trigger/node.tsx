"use client"

import { NodeProps } from "@xyflow/react"
import { memo, useState } from "react"
import { BaseTriggerNode } from "../base-trigger-node"
import { MousePointerIcon } from "lucide-react"
import { ManualTriggerSettingsDialog } from "./dialog"
import { NodeStatus } from "@/components/react-flow/node-status-indicator"

export const ManualTriggerNode = memo((props: NodeProps) => {
	const [openSettings, setOpenSettings] = useState(false)
	const handleOpenSettings = () => setOpenSettings(true)
	const nodeStatus: NodeStatus = "error"

	return (
		<>
			<ManualTriggerSettingsDialog
				open={openSettings}
				onOpenChange={setOpenSettings}
			/>
			<BaseTriggerNode
				{...props}
				icon={MousePointerIcon}
				name="When clicking 'Execute workfow'"
				onSettings={handleOpenSettings}
				onDoubleClick={handleOpenSettings}
				status={nodeStatus}
			/>
		</>
	)
})

ManualTriggerNode.displayName = "ManualTriggerNode"
