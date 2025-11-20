import { NodeSelector } from "@/components/node-selector"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export const AddNodeBtn = () => {
	return (
		<NodeSelector>
			<Button
				onClick={() => {}}
				size="icon"
				variant="outline"
				className="bg-background"
			>
				<PlusIcon />
			</Button>
		</NodeSelector>
	)
}
