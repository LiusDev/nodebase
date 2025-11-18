"use client"

import { EntityContainer, EntityHeader } from "@/components/entity-components"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"

export const WorkflowsList = () => {
	const { data: workflows } = useSuspenseWorkflows()

	return <pre>{JSON.stringify(workflows, null, 2)}</pre>
}

export const WorkflowsHeader = ({ disable }: { disable?: boolean }) => {
	const router = useRouter()
	const createWorkflow = useCreateWorkflow()
	const { handleError, modal } = useUpgradeModal()

	const handleCreateWorkflow = () => {
		createWorkflow.mutate(undefined, {
			onSuccess: (data) => {
				router.push(`/workflows/${data.id}`)
			},
			onError: handleError,
		})
	}
	return (
		<>
			{modal}
			<EntityHeader
				title="Workflows"
				description="Create and mange your workflows"
				onNew={handleCreateWorkflow}
				newButtonLabel="New Workflow"
				disabled={disable}
				isCreating={createWorkflow.isPending}
			/>
		</>
	)
}

export const WorkflowsContainer = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<EntityContainer
			header={<WorkflowsHeader />}
			search={<></>}
			pagination={<></>}
		>
			{children}
		</EntityContainer>
	)
}
