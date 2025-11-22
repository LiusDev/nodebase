"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useParams } from "next/navigation"
import { EditorParams } from "../params"
import { Button } from "@/components/ui/button"
import { SaveIcon } from "lucide-react"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import {
	useSuspenseWorkflow,
	useUpdateWorkflow,
	useUpdateWorkflowName,
} from "@/features/workflows/hooks/use-workflows"
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { useReactFlow } from "@xyflow/react"
import { Spinner } from "@/components/ui/spinner"

export const EditorNameInput = () => {
	const { workflowId } = useParams<EditorParams>()
	const { data: workflow } = useSuspenseWorkflow(workflowId)
	const updateWorkflowNameMutation = useUpdateWorkflowName()
	const [isEditing, setIsEditing] = useState(false)
	const [name, setName] = useState(workflow.name)

	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (workflow.name) {
			setName(workflow.name)
		}
	}, [workflow.name])

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [isEditing])

	const handleSave = () => {
		if (updateWorkflowNameMutation.isPending) return

		if (name === workflow.name) {
			setIsEditing(false)
			return
		}

		updateWorkflowNameMutation.mutate(
			{ id: workflowId, name },
			{
				onError: () => {
					setName(workflow.name)
				},
				onSettled: () => {
					setIsEditing(false)
				},
			}
		)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSave()
		} else if (event.key === "Escape") {
			setName(workflow.name)
			setIsEditing(false)
		}
	}

	if (isEditing) {
		return (
			<>
				<Input
					disabled={updateWorkflowNameMutation.isPending}
					ref={inputRef}
					value={name}
					onChange={(e) => setName(e.target.value)}
					onBlur={handleSave}
					onKeyDown={handleKeyDown}
					className="h-7 w-auto min-w-[100px] px-2"
				/>
			</>
		)
	}

	return (
		<BreadcrumbItem
			onClick={() => setIsEditing(true)}
			className="cursor-pointer hover:text-foreground transition-colors"
		>
			{name}
		</BreadcrumbItem>
	)
}

export const EditorBreadCrumbs = () => {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link prefetch href="/workflows">
							Workflows
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<EditorNameInput />
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export const EditorSaveButton = () => {
	const { workflowId } = useParams<EditorParams>()
	const workflowMutation = useUpdateWorkflow()
	const editor = useReactFlow()

	const handleSaveWorkflow = () => {
		if (workflowMutation.isPending) return
		const nodes = editor.getNodes()
		const edges = editor.getEdges()

		workflowMutation.mutate({ id: workflowId, nodes, edges })
	}
	return (
		<div className="ml-auto">
			<Button
				size="sm"
				onClick={handleSaveWorkflow}
				disabled={workflowMutation.isPending}
			>
				{workflowMutation.isPending ? (
					<div className="relative px-1.5">
						<Spinner className="size-4 absolute " />
					</div>
				) : (
					<SaveIcon className="size-4" />
				)}
				Save
			</Button>
		</div>
	)
}

export const EditorHeader = () => {
	return (
		<header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background">
			<SidebarTrigger />
			<div className="flex flex-row items-center justify-between gap-x-4 w-full">
				<EditorBreadCrumbs />
				<EditorSaveButton />
			</div>
		</header>
	)
}
