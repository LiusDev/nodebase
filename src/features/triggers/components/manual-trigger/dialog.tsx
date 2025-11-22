"use client"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useLocalState } from "@/hooks/use-local-state"

interface ManualTriggerDialogProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	children?: React.ReactNode
}

export const ManualTriggerSettingsDialog = ({
	open,
	onOpenChange,
	children,
}: ManualTriggerDialogProps) => {
	const [isOpen, setIsOpen] = useLocalState({
		defaultValue: false,
		value: open,
		setValue: onOpenChange,
	})
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Manual Trigger</DialogTitle>
					<DialogDescription>
						Configure settings for manual trigger node.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						Used to manually execute the workflow. No configuration
						is required.
					</p>
				</div>
			</DialogContent>
		</Dialog>
	)
}
