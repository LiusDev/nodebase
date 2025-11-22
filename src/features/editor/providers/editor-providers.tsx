"use client"

import { ReactFlowProvider } from "@xyflow/react"

export const EditorProviders = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return <ReactFlowProvider>{children}</ReactFlowProvider>
}
