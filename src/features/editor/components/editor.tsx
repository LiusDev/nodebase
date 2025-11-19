"use client"

import { EntityStateView } from "@/components/entity-components"
import { Spinner } from "@/components/ui/spinner"
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows"
import { AlertTriangleIcon } from "lucide-react"

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
	return <pre>{JSON.stringify(workflow, null, 2)}</pre>
}
