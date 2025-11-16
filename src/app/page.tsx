"use client"

import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export default function Page() {
	const trpc = useTRPC()
	const queryClient = useQueryClient()
	const { data } = useQuery(trpc.getWorkflows.queryOptions())
	const create = useMutation(
		trpc.createWorkflow.mutationOptions({
			onSuccess: () => {
				queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
			},
		})
	)
	return (
		<div>
			<h1>Workflows</h1>
			<ul>
				{data?.map((workflow) => (
					<li key={workflow.id}>{workflow.name}</li>
				))}
			</ul>
			<Button disabled={create.isPending} onClick={() => create.mutate()}>
				Create Workflow
			</Button>
		</div>
	)
}
