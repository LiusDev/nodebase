import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import prisma from "@/lib/db"
export const appRouter = createTRPCRouter({
	getWorkflows: protectedProcedure.query(() => {
		return prisma.workflow.findMany()
	}),
	createWorkflow: protectedProcedure.mutation(() => {
		return prisma.workflow.create({
			data: {
				name: "New Workflow",
			},
		})
	}),
})
// export type definition of API
export type AppRouter = typeof appRouter
