"use client"

import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
	const trpc = useTRPC()
	const { data } = useQuery(trpc.getWorkflows.queryOptions())
	return (
		<div>
			<h1>Workflows</h1>
			<ul>
				{data?.map((workflow) => (
					<li key={workflow.id}>{workflow.name}</li>
				))}
			</ul>
		</div>
	)
}
