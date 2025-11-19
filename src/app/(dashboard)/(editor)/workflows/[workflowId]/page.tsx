import { requireAuth } from "@/lib/auth-utils"
import { prefetchWorkflow } from "@/features/workflows/server/prefetch"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"
import { HydrateClient } from "@/trpc/server"
import {
	Editor,
	EditorError,
	EditorLoading,
} from "@/features/editor/components/editor"
import { EditorHeader } from "@/features/editor/components/editor-header"
import { EditorParams } from "@/features/editor/params"

interface PageProps {
	params: Promise<EditorParams>
}

export default async function Page({ params }: PageProps) {
	await requireAuth()
	const { workflowId } = await params
	prefetchWorkflow(workflowId)

	return (
		<HydrateClient>
			<ErrorBoundary fallback={<EditorError />}>
				<Suspense fallback={<EditorLoading />}>
					<EditorHeader />
					<main className="flex-1">
						<Editor workflowId={workflowId} />
					</main>
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	)
}
