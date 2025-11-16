import { createTRPCRouter, protectedProcedure } from "@/trpc/init"
import prisma from "@/lib/db"
import { inngest } from "@/inngest/client"
export const appRouter = createTRPCRouter({
	getWorkflows: protectedProcedure.query(() => {
		return prisma.workflow.findMany()
	}),
	createWorkflow: protectedProcedure.mutation(async () => {
		await inngest.send({
			name: "test/hello.world",
			data: {
				email: "test@gmail.com",
			},
		})
		return prisma.workflow.create({
			data: {
				name: "New Workflow",
			},
		})
	}),
})
// export type definition of API
export type AppRouter = typeof appRouter
