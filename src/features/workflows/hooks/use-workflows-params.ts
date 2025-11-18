import { workflowsParams } from "@/features/workflows/params"
import { useQueryStates } from "nuqs"

export const useWorkflowsParams = () => {
	return useQueryStates(workflowsParams)
}
