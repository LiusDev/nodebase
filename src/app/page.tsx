import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import Client from "./client"

export default async function Page() {
	const queryClient = getQueryClient()

	await queryClient.prefetchQuery(
		trpc.hello.queryOptions({ text: "from tRPC" })
	)

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Client />
		</HydrationBoundary>
	)
}
