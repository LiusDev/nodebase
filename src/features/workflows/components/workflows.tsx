"use client"

import {
	EntityContainer,
	EntityHeader,
	EntityPagination,
	EntitySearch,
} from "@/components/entity-components"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "../hooks/use-workflows-params"
import { useEntitySearch } from "@/hooks/use-entity-search"

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

export const WorkflowsSearch = () => {
	const [params, setParams] = useWorkflowsParams()
	const { searchValue, onSearchChange } = useEntitySearch({
		params,
		setParams,
	})

	return (
		<EntitySearch
			value={searchValue}
			onChange={onSearchChange}
			placeholder="Search Workflows..."
		/>
	)
}

export const WorkflowsPagination = () => {
	const workflows = useSuspenseWorkflows()
	const [params, setParams] = useWorkflowsParams()

	return (
		<EntityPagination
			disabled={workflows.isFetching}
			totalPages={workflows.data.totalPages}
			page={workflows.data.page}
			onPageChange={(page) => setParams({ ...params, page })}
		/>
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
			search={<WorkflowsSearch />}
			pagination={<WorkflowsPagination />}
		>
			{children}
		</EntityContainer>
	)
}
