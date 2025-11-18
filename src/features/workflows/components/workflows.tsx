"use client"

import {
	EntityContainer,
	EntityEmptyView,
	EntityHeader,
	EntityItem,
	EntityList,
	EntityPagination,
	EntitySearch,
	EntityStateView,
} from "@/components/entity-components"
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { useUpgradeModal } from "@/hooks/use-upgrade-modal"
import { useRouter } from "next/navigation"
import { useWorkflowsParams } from "../hooks/use-workflows-params"
import { useEntitySearch } from "@/hooks/use-entity-search"
import { Spinner } from "@/components/ui/spinner"
import { AlertTriangleIcon, PackageOpenIcon, WorkflowIcon } from "lucide-react"
import type { Workflow } from "@/generated/prisma/client"
import type { SerializedDates } from "@/lib/prisma-types"

// Type for workflows coming from tRPC (dates are serialized as strings)
type WorkflowData = SerializedDates<Workflow>

export const WorkflowsList = () => {
	const { data: workflows } = useSuspenseWorkflows()

	return (
		<EntityList
			items={workflows.items}
			getKey={(workflow) => workflow.id}
			renderItem={(workflow) => <WorkflowItem workflow={workflow} />}
			emptyView={<WorkflowsEmpty />}
		/>
	)
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

export const WorkflowsLoading = () => {
	return (
		<EntityStateView
			icon={<Spinner className="size-6" />}
			title="Loading Workflows..."
		/>
	)
}

export const WorkflowsError = () => {
	return (
		<EntityStateView
			icon={<AlertTriangleIcon className="size-6 text-orange-600" />}
			title="Error loading workflows"
		/>
	)
}

export const WorkflowsEmpty = () => {
	const createWorkflow = useCreateWorkflow()
	const { handleError, modal } = useUpgradeModal()
	const router = useRouter()

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
			<EntityEmptyView
				icon={<PackageOpenIcon className="size-6" />}
				title="No Workflows Found"
				message="Create your first workflow to get started."
				onNews={handleCreateWorkflow}
				newLabel="Create workflow"
			/>
		</>
	)
}

export const WorkflowItem = ({ workflow }: { workflow: WorkflowData }) => {
	return (
		<EntityItem
			href={`/workflows/${workflow.id}`}
			title={workflow.name || "Untitled Workflow"}
			subtitle={"No description provided."}
			image={
				<div className="size-8 flex items-center justify-center">
					<WorkflowIcon className="size-5 text-muted-foreground" />
				</div>
			}
			onRemove={() => {}}
			isRemoving={false}
		/>
	)
}
