"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { HttpRequestMethod } from "@/config/constants"
import { useLocalState } from "@/hooks/use-local-state"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

export const formSchema = z.object({
	endpoint: z.url({ error: "Please enter a valid URL" }),
	method: z.enum(HttpRequestMethod),
	body: z.string().optional(),
})

interface HttpRequestDialogProps {
	open?: boolean
	onOpenChange?: (open: boolean) => void
	children?: React.ReactNode
	onSubmit: (value: z.infer<typeof formSchema>) => void
	defaultEndpoint?: string
	defaultMethod?: HttpRequestMethod
	defaultBody?: string
}

export const HttpRequestSettingsDialog = ({
	open,
	onOpenChange,
	children,
	onSubmit,
	defaultEndpoint = "",
	defaultMethod = HttpRequestMethod.GET,
	defaultBody = "",
}: HttpRequestDialogProps) => {
	const [isOpen, setIsOpen] = useLocalState({
		defaultValue: false,
		value: open,
		setValue: onOpenChange,
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			endpoint: defaultEndpoint,
			method: defaultMethod,
			body: defaultBody,
		},
	})

	// Reset form if open changes
	useEffect(() => {
		if (!open) {
			form.reset({
				endpoint: defaultEndpoint,
				method: defaultMethod,
				body: defaultBody,
			})
		}
	}, [open, form, defaultEndpoint, defaultMethod, defaultBody])

	const watchMethod = form.watch("method")
	const showBodyField = [
		HttpRequestMethod.POST,
		HttpRequestMethod.PUT,
		HttpRequestMethod.PATCH,
	].includes(watchMethod)

	const handleSubmit = (values: z.infer<typeof formSchema>) => {
		onSubmit(values)
		setIsOpen(false)
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>HTTP Request</DialogTitle>
					<DialogDescription>
						Configure settings for HTTP Request node.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-8 mt-4"
					>
						<FormField
							control={form.control}
							name="method"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Method</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a method" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem
												value={HttpRequestMethod.GET}
											>
												GET
											</SelectItem>
											<SelectItem
												value={HttpRequestMethod.POST}
											>
												POST
											</SelectItem>
											<SelectItem
												value={HttpRequestMethod.PUT}
											>
												PUT
											</SelectItem>
											<SelectItem
												value={HttpRequestMethod.PATCH}
											>
												PATCH
											</SelectItem>
											<SelectItem
												value={HttpRequestMethod.DELETE}
											>
												DELETE
											</SelectItem>
										</SelectContent>
									</Select>
									<FormDescription>
										The HTTP method to use for this request.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="endpoint"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Endpoint URL</FormLabel>
									<FormControl>
										<Input
											placeholder="https://example.com"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Static URL or use {"{{variables}}"} for
										simple values or {"{{JSON variable}}"}{" "}
										to stringify objects
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{showBodyField && (
							<FormField
								control={form.control}
								name="body"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Request body</FormLabel>
										<FormControl>
											<Textarea
												placeholder="{}"
												className="min-h-[120px] font-mono text-sm"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											JSON with template variables. Use{" "}
											{"{{variables}}"} for simple values
											or {"{{JSON variable}}"} to
											stringify objects
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						<DialogFooter className="mt-4">
							<Button type="submit">Save</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
